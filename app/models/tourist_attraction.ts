import { column } from '@adonisjs/lucid/orm'
import Tourism from '#models/tourism'

export default class TouristAttraction extends Tourism {
  @column()
  declare attractionType: string

  @column()
  declare bestVisitTime: string

  @column()
  declare entryFee: number

  @column()
  declare openingHours: string

  @column()
  declare guideTours: boolean
}
