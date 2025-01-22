import { belongsTo, column } from '@adonisjs/lucid/orm'
import Tourism_post from '#models/tourism_post'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Hotel extends Tourism_post {
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

  @belongsTo(() => Tourism_post)
  declare touristAttraction: BelongsTo<typeof Tourism_post>
}
