import type { HttpContext } from '@adonisjs/core/http'
import Library from '#models/library'
import { libraryValidator } from '#validators/education'
import { postValidator } from '#validators/post'
import { educationalInstitutionValidator } from '#validators/educational_institution'
import Post from '#models/post'
import EducationalInstitution from '#models/educational_institution'

export default class LibrariesController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const posts = await Library.query().paginate(page, limit)
    return response.ok(posts)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const postData = await request.validateUsing(postValidator)
    const educationalInstitutionData = await request.validateUsing(educationalInstitutionValidator)
    const collegeData = await request.validateUsing(libraryValidator)

    const createdPost = await Post.create(postData)
    const educationalInstitution = await EducationalInstitution.create({
      ...educationalInstitutionData,
      postId: createdPost.id,
    })

    const post = await Library.create({
      ...collegeData,
      educationalInstitutionId: educationalInstitution.id,
    })
    response.ok(post)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request, response, params }: HttpContext) {
    const postData = await request.validateUsing(postValidator)
    const educationalInstitutionData = await request.validateUsing(educationalInstitutionValidator)
    const libraryData = await request.validateUsing(libraryValidator)

    // 1. First find the base Post
    const post = await Post.findOrFail(params.id)

    // 2. Find the Educational Institution related to base post
    const educationalInstitution = await EducationalInstitution.query()
      .where('postId', post.id)
      .firstOrFail()

    // 3. Find the Library related to educational institution
    const library = await Library.query()
      .where('educationalInstitutionId', educationalInstitution.id)
      .firstOrFail()

    // 4. Update all three models in order
    await post.merge(postData).save()
    await educationalInstitution.merge(educationalInstitutionData).save()
    await library.merge(libraryData).save()

    // 5. Return the updated data
    response.ok({
      ...post.toJSON(),
      ...educationalInstitution.toJSON(),
      ...library.toJSON(),
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    // 1. Find base Post
    const post = await Post.findOrFail(params.id)

    // 2. Find Educational Institution
    const educationalInstitution = await EducationalInstitution.query()
      .where('postId', post.id)
      .firstOrFail()

    // 3. Find Library
    const library = await Library.query()
      .where('educationalInstitutionId', educationalInstitution.id)
      .firstOrFail()

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

      // Educational Institution data
      isVerified: educationalInstitution.isVerified,
      private: educationalInstitution.private,
      institutionType: educationalInstitution.institutionType,

      // Library specific data
      bookCount: library.bookCount,
      sections: library.sections,
      hasDigitalAccess: library.hasDigitalAccess,
      operationHours: library.operationHours,
      hasPrinting: library.hasPrinting,
      hasStudyRooms: library.hasStudyRooms,

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
