import { belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import TourismPost from '#models/tourism_post'

export default class TouristAttraction extends TourismPost {
  @column()
  declare tourismPostId: number

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

  @belongsTo(() => TourismPost)
  declare touristAttraction: BelongsTo<typeof TourismPost>
}
