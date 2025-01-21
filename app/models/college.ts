import { belongsTo, column } from '@adonisjs/lucid/orm'
import EducationalInstitution from '#models/educational_institution'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class College extends EducationalInstitution {
  @column()
  declare educationalInstitutionId: number

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

  @belongsTo(() => EducationalInstitution)
  declare educationalInstitution: BelongsTo<typeof EducationalInstitution>
}
