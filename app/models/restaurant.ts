import { column } from '@adonisjs/lucid/orm'
import Tourism from '#models/tourism'

export default class Restaurant extends Tourism {
  @column()
  declare cuisine: string

  @column()
  declare priceRanges: string

  @column()
  declare menus: string

  @column()
  declare openingHours: string

  @column()
  declare takeout: boolean

  @column()
  declare delivery: boolean
}
