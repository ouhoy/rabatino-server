import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import PostType from '#models/post_type'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { PostType as PostTypeEnum } from '#enums/post_type_enum'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare userId: number

  @column()
  declare typeId: PostTypeEnum

  @column()
  declare address: string

  @column()
  declare latitude: number

  @column()
  declare longitude: number

  @column()
  declare website?: string

  @column()
  declare phone?: string

  @column()
  declare email?: string

  @column()
  declare views: number

  /**
   * Increment view count for the post
   */
  public async incrementViews() {
    this.views += 1
    await this.save()
  }

  @column()
  declare featuredImage: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => PostType)
  declare type: BelongsTo<typeof PostType>
}
