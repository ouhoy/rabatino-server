import { column } from '@adonisjs/lucid/orm'
import EducationalInstitution from '#models/educational_institution'

export default class CoachingCenter extends EducationalInstitution {
  @column()
  declare specialty: string

  @column()
  declare courses: string[]

  @column()
  declare schedule: string
}
