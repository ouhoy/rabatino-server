import type { HttpContext } from '@adonisjs/core/http'
import JobPost from '#models/job_post'
import { jobPostValidator } from '#validators/job_post'

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
    const data = await request.validateUsing(jobPostValidator)

    const post = await JobPost.create(data)
    response.ok(post)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(jobPostValidator)
    const postId = params.id

    const post = await JobPost.findOrFail(postId)
    post.merge(data)
    await post.save()

    response.ok(post)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const postId = params.id
    const post = await JobPost.findOrFail(postId)
    await post.incrementViews()
    return response.ok(post)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const postId = params.id
    const post = await JobPost.findOrFail(postId)
    await post.delete()
    return response.ok(true)
  }
}
