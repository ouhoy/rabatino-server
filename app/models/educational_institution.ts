import { belongsTo, column } from '@adonisjs/lucid/orm'
import { InstitutionType } from '#enums/educational_institution_enum'
import Post from '#models/post'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class EducationalInstitution extends Post {
  @column()
  declare postId: number

  @column()
  declare isVerified: boolean

  @column()
  declare private: boolean

  @column()
  declare institutionType: InstitutionType

  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>
}
