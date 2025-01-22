import type { HttpContext } from '@adonisjs/core/http'
import Restaurant from '#models/restaurant'
import { restaurantValidator, tourismValidator } from '#validators/tourism'
import Post from '#models/post'
import { postValidator } from '#validators/post'
import TourismPost from '#models/tourism_post'

export default class RestaurantsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const posts = await Restaurant.query().paginate(page, limit)
    return response.ok(posts)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const postData = await request.validateUsing(postValidator)
    const tourismContainer = await request.validateUsing(tourismValidator)
    const tourismAttraction = await request.validateUsing(restaurantValidator)

    const createdPost = await Post.create(postData)
    const tourismPost = await TourismPost.create({
      ...tourismContainer,
      postId: createdPost.id,
    })

    const post = await Restaurant.create({
      ...tourismAttraction,
      tourismPostId: tourismPost.id,
    })
    response.ok(post)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, response, params }: HttpContext) {
    const postData = await request.validateUsing(postValidator)
    const tourismContainer = await request.validateUsing(tourismValidator)
    const tourismAttractionPost = await request.validateUsing(restaurantValidator)

    // First find the college record
    const college = await Restaurant.findOrFail(params.id)

    // Find and update the educational institution
    const educationalInstitution = await TourismPost.findOrFail(college.tourismPostId)

    // Find and update the base post
    const post = await Post.findOrFail(educationalInstitution.postId)

    // Update all three models
    await post.merge(postData).save()
    await educationalInstitution.merge(tourismContainer).save()
    await college.merge(tourismAttractionPost).save()

    response.ok(post)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    // 1. Find base Post
    const post = await Post.findOrFail(params.id)

    // 2. Find Tourism post
    const tourismPost = await TourismPost.query().where('postId', post.id).firstOrFail()

    // 3. Find Restaurant with relationships
    const restaurant = await Restaurant.query().where('tourismPostId', tourismPost.id).firstOrFail()

    // 4. Increment views
    await post.incrementViews()

    // 5. Flatten data structure
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

      // Tourism post data
      isActive: tourismPost.isActive,
      rating: tourismPost.rating,
      tourismType: tourismPost.tourismType,

      // Restaurant specific data
      cuisine: restaurant.cuisine,
      priceRanges: restaurant.priceRanges,
      menus: restaurant.menus,
      openingHours: restaurant.openingHours,
      takeout: restaurant.takeout,
      delivery: restaurant.delivery,

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
