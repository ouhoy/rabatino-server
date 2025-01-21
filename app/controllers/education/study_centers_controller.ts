import type { HttpContext } from '@adonisjs/core/http'
import StudyCenter from '#models/study_center'
import { studyCenterValidator } from '#validators/education'

export default class StudyCentersController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const posts = await StudyCenter.query().paginate(page, limit)
    return response.ok(posts)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(studyCenterValidator)

    const post = await StudyCenter.create(data)
    response.ok(post)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(studyCenterValidator)
    const postId = params.id

    const post = await StudyCenter.findOrFail(postId)
    post.merge(data)
    await post.save()

    response.ok(post)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const postId = params.id
    const post = await StudyCenter.findOrFail(postId)
    return response.ok(post)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const postId = params.id
    const post = await StudyCenter.findOrFail(postId)
    await post.delete()
    return response.ok(true)
  }
}
