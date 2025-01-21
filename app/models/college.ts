import { column } from '@adonisjs/lucid/orm'
import EducationalInstitution from '#models/educational_institution'

export default class College extends EducationalInstitution {
  @column()
  declare departments: string[]

  @column()
  declare specialization: string

  @column()
  declare affiliation: string

  @column()
  declare hasNote: boolean

  @column()
  declare facilities: string[]
}
