import { belongsTo, column } from '@adonisjs/lucid/orm'
import Tourism_post from '#models/tourism_post'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Restaurant extends Tourism_post {
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

  @belongsTo(() => Tourism_post)
  declare touristAttraction: BelongsTo<typeof Tourism_post>
}
