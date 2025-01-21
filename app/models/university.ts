import { belongsTo, column } from '@adonisjs/lucid/orm'
import EducationalInstitution from '#models/educational_institution'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class University extends EducationalInstitution {
  @column()
  declare educationalInstitutionId: number

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

  @belongsTo(() => EducationalInstitution)
  declare educationalInstitution: BelongsTo<typeof EducationalInstitution>
}
