import { belongsTo, column } from '@adonisjs/lucid/orm'
import EducationalInstitution from '#models/educational_institution'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class StudyCenter extends EducationalInstitution {
  @column()
  declare educationalInstitutionId: number

  @column()
  declare capacity: number

  @column()
  declare amenities: string[]

  @column()
  declare hourlyRateRange: number[]

  @column()
  declare has24Access: boolean

  @column()
  declare rooms: string[]

  @belongsTo(() => EducationalInstitution)
  declare educationalInstitution: BelongsTo<typeof EducationalInstitution>
}
