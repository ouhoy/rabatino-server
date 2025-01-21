import { column } from '@adonisjs/lucid/orm'
import { JobType } from '#enums/job_type_enum'
import { WorkLocation } from '#enums/work_location_enum'
import Post from '#models/post'

export default class JobPost extends Post {
  @column()
  declare company: string

  @column()
  declare logo: string

  @column()
  declare salary: string

  @column()
  declare jobType: JobType

  @column()
  declare workLocation: WorkLocation

  @column()
  declare requirements: string[]

  @column()
  declare applicationLink: string

  @column()
  declare expiryDate: String

  @column()
  declare isActive: boolean
}
