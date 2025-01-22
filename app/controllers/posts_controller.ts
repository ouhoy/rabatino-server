import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import EducationalInstitution from '#models/educational_institution'
import TourismPost from '#models/tourism_post'

export default class PostsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const postsResult = await Post.query().paginate(page, limit)
    const paginationData = {
      meta: {
        total: postsResult.total,
        per_page: postsResult.perPage,
        current_page: postsResult.currentPage,
        last_page: postsResult.lastPage,
        first_page: 1,
        first_page_url: postsResult.firstPageUrl,
        last_page_url: postsResult.lastPageUrl,
        next_page_url: postsResult.nextPageUrl,
        previous_page_url: postsResult.previousPageUrl,
      },
      data: await Promise.all(
        postsResult.map(async (post) => {
          // Get only the actual attributes from the post
          const cleanPost = {
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
            views: post.views,
            email: post.email,
            featuredImage: post.featuredImage,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          }

          if (post.typeId === 2) {
            const educationalInstitution = await EducationalInstitution.query()
              .where('postId', post.id)
              .first()

            if (educationalInstitution) {
              cleanPost['institutionType'] = educationalInstitution.institutionType
            }
          }

          if (post.typeId === 4) {
            const tourismPost = await TourismPost.query().where('postId', post.id).first()

            if (tourismPost) {
              cleanPost['tourismType'] = tourismPost.tourismType
            }
          }

          return cleanPost
        })
      ),
    }

    return response.ok(paginationData)
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
