import { column } from '@adonisjs/lucid/orm'
import { InstitutionType } from '#enums/educational_institution_enum'
import Post from '#models/post'

export default class EducationalInstitution extends Post {
  @column()
  declare isVerified: boolean

  @column()
  declare private: boolean

  @column()
  declare type: InstitutionType
}
