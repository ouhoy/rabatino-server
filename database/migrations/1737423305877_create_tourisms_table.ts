import { BaseSchema } from '@adonisjs/lucid/schema'
import { TourismType } from '#enums/tourism_enum'

export default class extends BaseSchema {
  protected tableName = 'tourisms'

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
      table.boolean('is_active').defaultTo(true)
      table.decimal('rating', 2, 1)
      table.enum('type', Object.values(TourismType)).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
