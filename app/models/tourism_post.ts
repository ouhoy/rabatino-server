import { belongsTo, column } from '@adonisjs/lucid/orm'
import Post from '#models/post'
import { TourismType } from '#enums/tourism_enum'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class TourismPost extends Post {
  @column()
  declare postId: number

  @column()
  declare isActive: boolean

  @column()
  declare rating: number

  @column()
  declare tourismType: TourismType

  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>
}
