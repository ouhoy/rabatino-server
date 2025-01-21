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
    const jobPost = await JobPost.query().where('postId', params.id).preload('post').firstOrFail()

    // Increment views
    await jobPost.post.incrementViews()
    // Merge all data for complete response
    return response.ok(jobPost)
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
