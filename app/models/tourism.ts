import { column } from '@adonisjs/lucid/orm'
import Post from '#models/post'
import { TourismType } from '#enums/tourism_enum'

export default class Tourism extends Post {
  @column()
  declare isActive: boolean

  @column()
  declare rating: number

  @column()
  declare type: TourismType
}
