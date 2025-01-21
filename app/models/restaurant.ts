import { belongsTo, column } from '@adonisjs/lucid/orm'
import Tourism from '#models/tourism'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Restaurant extends Tourism {
  @column()
  declare tourismPostId: number

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

  @belongsTo(() => Tourism)
  declare post: BelongsTo<typeof Tourism>
}
