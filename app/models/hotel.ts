import { column } from '@adonisjs/lucid/orm'
import Tourism from '#models/tourism'

export default class Hotel extends Tourism {
  @column()
  declare amenities: string[]

  @column()
  declare priceRanges: string

  @column()
  declare totalRooms: number

  @column()
  declare roomTypes: string

  @column()
  declare checkInTime: string
}
