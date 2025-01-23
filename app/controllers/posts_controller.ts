import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'
import EducationalInstitution from '#models/educational_institution'
import TourismPost from '#models/tourism_post'
import JobPost from '#models/job_post'
import BusinessPost from '#models/business_post'

export default class PostsController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    // Get regular posts
    const postsResult = await Post.query().paginate(page, limit)

    // Get business posts
    const businessPosts = await BusinessPost.query().exec()

    // Format business posts
    const formattedBusinessPosts = businessPosts.map(post => ({
      id: post.id,
      typeId: 3,
      title: post.title,
      body: post.body,
      featuredImg: post.featuredImg,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }))

    // Process regular posts
    const regularPosts = await Promise.all(
      postsResult.map(async (post) => {
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
          const tourismPost = await TourismPost.query()
            .where('postId', post.id)
            .first()

          if (tourismPost) {
            cleanPost['tourismType'] = tourismPost.tourismType
          }
        }

        return cleanPost
      })
    )

    // Combine both results
    const combinedResults = [...regularPosts, ...formattedBusinessPosts]

    const paginationData = {
      meta: {
        total: combinedResults.length,
        per_page: limit,
        current_page: page,
        last_page: Math.ceil(combinedResults.length / limit),
        first_page: 1,
        first_page_url: `?page=1&limit=${limit}`,
        last_page_url: `?page=${Math.ceil(combinedResults.length / limit)}&limit=${limit}`,
        next_page_url: page * limit < combinedResults.length ? `?page=${page + 1}&limit=${limit}` : null,
        previous_page_url: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
      },
      data: combinedResults.slice((page - 1) * limit, page * limit)
    }

    return response.ok(paginationData)
  }

  /**
   * Display tourism posts only
   */
  async tourismPosts({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const postsResult = await Post.query()
      .where('typeId', 4)
      .paginate(page, limit)

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

          const tourismPost = await TourismPost.query().where('postId', post.id).first()
          if (tourismPost) {
            cleanPost['tourismType'] = tourismPost.tourismType
          }

          return cleanPost
        })
      ),
    }

    return response.ok(paginationData)
  }

  /**
   * Display educational posts only
   */
  async educationalPosts({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const postsResult = await Post.query()
      .where('typeId', 2)
      .paginate(page, limit)

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

          const educationalInstitution = await EducationalInstitution.query()
            .where('postId', post.id)
            .first()
          if (educationalInstitution) {
            cleanPost['institutionType'] = educationalInstitution.institutionType
          }

          return cleanPost
        })
      ),
    }

    return response.ok(paginationData)
  }

  /**
   * Display job posts only
   */
  async jobPosts({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const postsResult = await Post.query()
      .where('typeId', 1)
      .paginate(page, limit)

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

          const jobPost = await JobPost.query()
            .where('postId', post.id)
            .first()

          if (jobPost) {
            cleanPost['company'] = jobPost.company
            cleanPost['logo'] = jobPost.logo
            cleanPost['salary'] = jobPost.salary
            cleanPost['jobType'] = jobPost.jobType
            cleanPost['workLocation'] = jobPost.workLocation
            cleanPost['requirements'] = jobPost.requirements
            cleanPost['applicationLink'] = jobPost.applicationLink
            cleanPost['expiryDate'] = jobPost.expiryDate
            cleanPost['isActive'] = jobPost.isActive
          }

          return cleanPost
        })
      ),
    }

    return response.ok(paginationData)
  }

  /**
   * Search posts by title
   */
  async search({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)
    const searchQuery = request.input('query', '')

    // Get regular posts
    const postsResult = await Post.query()
      .whereILike('title', `%${searchQuery}%`)
      .paginate(page, limit)

    // Get business posts
    const businessPosts = await BusinessPost.query()
      .whereILike('title', `%${searchQuery}%`)
      .exec()

    // Format business posts to match required structure
    const formattedBusinessPosts = businessPosts.map(post => ({
      id: post.id,
      typeId: 3, // Always set to 3 for business posts
      title: post.title,
      body: post.body,
      featuredImg: post.featuredImg,
      tags: post.tags,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }))

    // Process regular posts as before
    const regularPosts = await Promise.all(
      postsResult.map(async (post) => {
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
          const tourismPost = await TourismPost.query()
            .where('postId', post.id)
            .first()

          if (tourismPost) {
            cleanPost['tourismType'] = tourismPost.tourismType
          }
        }

        return cleanPost
      })
    )

    // Combine both results
    const combinedResults = [...regularPosts, ...formattedBusinessPosts]

    const paginationData = {
      meta: {
        total: combinedResults.length,
        per_page: limit,
        current_page: page,
        last_page: Math.ceil(combinedResults.length / limit),
        first_page: 1,
        first_page_url: `?page=1&limit=${limit}`,
        last_page_url: `?page=${Math.ceil(combinedResults.length / limit)}&limit=${limit}`,
        next_page_url: page * limit < combinedResults.length ? `?page=${page + 1}&limit=${limit}` : null,
        previous_page_url: page > 1 ? `?page=${page - 1}&limit=${limit}` : null,
      },
      data: combinedResults.slice((page - 1) * limit, page * limit)
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
