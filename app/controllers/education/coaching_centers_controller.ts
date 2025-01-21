import type { HttpContext } from '@adonisjs/core/http'
import CoachingCenter from '#models/coaching_center'
import { coachingCenterValidator } from '#validators/education'

export default class CoachingCentersController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const posts = await CoachingCenter.query().paginate(page, limit)
    return response.ok(posts)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(coachingCenterValidator)

    const post = await CoachingCenter.create(data)
    response.ok(post)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(coachingCenterValidator)
    const postId = params.id

    const post = await CoachingCenter.findOrFail(postId)
    post.merge(data)
    await post.save()

    response.ok(post)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const postId = params.id
    const post = await CoachingCenter.findOrFail(postId)
    return response.ok(post)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const postId = params.id
    const post = await CoachingCenter.findOrFail(postId)
    await post.delete()
    return response.ok(true)
  }
}
