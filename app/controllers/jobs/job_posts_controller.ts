import type { HttpContext } from '@adonisjs/core/http'
import JobPost from '#models/job_post'
import { jobPostValidator } from '#validators/job_post'
import { postValidator } from '#validators/post'
import Post from '#models/post'

export default class JobPostsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const posts = await JobPost.query().paginate(page, limit)
    return response.ok(posts)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const postData = await request.validateUsing(postValidator)
    const jobData = await request.validateUsing(jobPostValidator)

    const createdPost = await Post.create(postData)

    const post = await JobPost.create({
      ...jobData,
      postId: createdPost.id,
    })
    response.ok(post)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, response, params }: HttpContext) {
    const postData = await request.validateUsing(postValidator)
    const jobData = await request.validateUsing(jobPostValidator)

    // First find the job post record
    const jobPost = await JobPost.findOrFail(params.id)

    // Find and update the base post
    const post = await Post.findOrFail(jobPost.postId)

    // Update all three models
    await post.merge(postData).save()
    await jobPost.merge(jobData).save()

    response.ok(post)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    // 1. Find base Post
    const post = await Post.findOrFail(params.id)

    // 2. Find Job Post
    const jobPost = await JobPost.query().where('postId', post.id).firstOrFail()

    // 3. Increment views
    await post.incrementViews()

    // 4. Flatten data structure
    const flattenedData = {
      // Post data
      id: post.id,
      title: post.title,
      description: post.description,
      userId: post.userId,
      typeId: post.typeId,
      address: post.address,
      latitude: post.latitude,
      longitude: post.longitude,
      website: post.website,
      phone: post.phone,
      email: post.email,
      views: post.views,
      featuredImage: post.featuredImage,

      // Job Post data
      company: jobPost.company,
      logo: jobPost.logo,
      salary: jobPost.salary,
      jobType: jobPost.jobType,
      workLocation: jobPost.workLocation,
      requirements: jobPost.requirements,
      applicationLink: jobPost.applicationLink,
      expiryDate: jobPost.expiryDate,
      isActive: jobPost.isActive,

      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }

    return response.ok(flattenedData)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const postId = params.id
    const post = await Post.findOrFail(postId)
    await post.delete()
    return response.ok(true)
  }
}
