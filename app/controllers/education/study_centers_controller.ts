import type { HttpContext } from '@adonisjs/core/http'
import StudyCenter from '#models/study_center'
import { studyCenterValidator } from '#validators/education'
import { postValidator } from '#validators/post'
import { educationalInstitutionValidator } from '#validators/educational_institution'
import Post from '#models/post'
import EducationalInstitution from '#models/educational_institution'

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
    const postData = await request.validateUsing(postValidator)
    const educationalInstitutionData = await request.validateUsing(educationalInstitutionValidator)
    const collegeData = await request.validateUsing(studyCenterValidator)

    const createdPost = await Post.create(postData)
    const educationalInstitution = await EducationalInstitution.create({
      ...educationalInstitutionData,
      postId: createdPost.id,
    })

    const post = await StudyCenter.create({
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
    const collegeData = await request.validateUsing(studyCenterValidator)

    // First find the college record
    const college = await StudyCenter.findOrFail(params.id)

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
    const college = await StudyCenter.query()
      .where('id', params.id)
      .preload('educationalInstitution', (query) => {
        query.preload('post')
      })
      .firstOrFail()

    // Increment views on the base post
    await college.educationalInstitution.post.incrementViews()

    // Merge all data for complete response
    return response.ok(college)
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
