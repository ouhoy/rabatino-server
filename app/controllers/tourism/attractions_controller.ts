import type { HttpContext } from '@adonisjs/core/http'
import TouristAttraction from '#models/tourist_attraction'
import { touristAttractionValidator } from '#validators/tourism'

export default class AttractionsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const posts = await TouristAttraction.query().paginate(page, limit)
    return response.ok(posts)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(touristAttractionValidator)

    const post = await TouristAttraction.create(data)
    response.ok(post)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, response, params }: HttpContext) {
    const data = await request.validateUsing(touristAttractionValidator)
    const postId = params.id

    const post = await TouristAttraction.findOrFail(postId)
    post.merge(data)
    await post.save()

    response.ok(post)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const postId = params.id
    const post = await TouristAttraction.findOrFail(postId)
    return response.ok(post)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const postId = params.id
    const post = await TouristAttraction.findOrFail(postId)
    await post.delete()
    return response.ok(true)
  }
}
