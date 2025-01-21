import { belongsTo, column } from '@adonisjs/lucid/orm'
import EducationalInstitution from '#models/educational_institution'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Library extends EducationalInstitution {
  @column()
  declare educationalInstitutionId: number

  @column()
  declare bookCount: number

  @column()
  declare sections: string[]

  @column()
  declare hasDigitalAccess: boolean

  @column()
  declare operationHours: string

  @column()
  declare hasPrinting: boolean

  @column()
  declare hasStudyRooms: boolean

  @belongsTo(() => EducationalInstitution)
  declare educationalInstitution: BelongsTo<typeof EducationalInstitution>
}
