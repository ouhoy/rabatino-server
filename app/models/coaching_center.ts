import { belongsTo, column } from '@adonisjs/lucid/orm'
import EducationalInstitution from '#models/educational_institution'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class CoachingCenter extends EducationalInstitution {
  @column()
  declare specialty: string

  @column()
  declare courses: string[]

  @column()
  declare schedule: string

  @belongsTo(() => EducationalInstitution)
  declare educationalInstitution: BelongsTo<typeof EducationalInstitution>
}
