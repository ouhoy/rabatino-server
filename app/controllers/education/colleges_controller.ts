import type { HttpContext } from '@adonisjs/core/http'
import College from '#models/college'
import { collegeValidator } from '#validators/education'
import Post from '#models/post'
import { postValidator } from '#validators/post'
import EducationalInstitution from '#models/educational_institution'
import { educationalInstitutionValidator } from '#validators/educational_institution'

export default class CollegesController {
  /**
   * Display a list of resource
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 16)

    const posts = await College.query().paginate(page, limit)
    return response.ok(posts)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const postData = await request.validateUsing(postValidator)
    const educationalInstitutionData = await request.validateUsing(educationalInstitutionValidator)
    const collegeData = await request.validateUsing(collegeValidator)

    const createdPost = await Post.create(postData)
    const educationalInstitution = await EducationalInstitution.create({
      ...educationalInstitutionData,
      postId: createdPost.id,
    })

    const post = await College.create({
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
    const collegeData = await request.validateUsing(collegeValidator)

    // First find the college record
    const college = await College.findOrFail(params.id)

    // Find and update the educational institution
    const educationalInstitution = await EducationalInstitution.findOrFail(
      college.educationalInstitutionId
    )

    // Find and update the base post
    const post = await Post.findOrFail(educationalInstitution.postId)

    // Update all three models
    await post.merge(postData).save()
    await educationalInstitution.merge(educationalInstitutionData).save()
    await college.merge(collegeData).save()

    response.ok(post)
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

    // 3. Find College
    const college = await College.query()
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

      // College specific data
      departments: college.departments,
      specialization: college.specialization,
      affiliation: college.affiliation,
      hasNote: college.hasNote,
      facilities: college.facilities,

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
