import { column } from '@adonisjs/lucid/orm'
import EducationalInstitution from '#models/educational_institution'

export default class Library extends EducationalInstitution {
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
}
