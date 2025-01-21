import { BaseSchema } from '@adonisjs/lucid/schema'
import { InstitutionType } from '#enums/educational_institution_enum'

export default class extends BaseSchema {
  protected tableName = 'educational_institutions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('post_id')
        .unsigned()
        .references('id')
        .inTable('posts')
        .onDelete('CASCADE')
        .notNullable()
      table.boolean('is_verified').defaultTo(false)
      table.boolean('private').defaultTo(false)
      table.enum('institutionType', Object.values(InstitutionType)).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
