import { belongsTo, column } from '@adonisjs/lucid/orm'
import Tourism from '#models/tourism'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Hotel extends Tourism {
  @column()
  declare tourismPostId: number

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

  @belongsTo(() => Tourism)
  declare post: BelongsTo<typeof Tourism>
}
