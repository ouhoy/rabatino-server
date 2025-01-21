import { belongsTo, column } from '@adonisjs/lucid/orm'
import Tourism from '#models/tourism'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class TouristAttraction extends Tourism {
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

  @belongsTo(() => Tourism)
  declare post: BelongsTo<typeof Tourism>
}
