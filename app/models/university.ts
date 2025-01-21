import { column } from '@adonisjs/lucid/orm'
import EducationalInstitution from '#models/educational_institution'

export default class University extends EducationalInstitution {
  @column()
  declare faculties: string[]

  @column()
  declare ranking: string

  @column()
  declare accreditation: string

  @column()
  declare hasHousing: boolean

  @column()
  declare researchCenters: string[]

  @column()
  declare facilities: string[]
}
