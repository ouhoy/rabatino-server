import { column } from '@adonisjs/lucid/orm'
import EducationalInstitution from '#models/educational_institution'

export default class StudyCenter extends EducationalInstitution {
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
}
