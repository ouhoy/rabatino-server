import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Post from '#models/post'
import { PostType } from '#enums/post_type_enum'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: PostType

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Post, {
    foreignKey: 'post_type_id',
    localKey: 'id',
  })
  declare post: HasMany<typeof Post>
}
