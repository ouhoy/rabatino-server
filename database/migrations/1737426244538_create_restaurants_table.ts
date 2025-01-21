import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'restaurants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('tourism_posts_id')
        .unsigned()
        .references('id')
        .inTable('tourism_posts')
        .onDelete('CASCADE')
        .notNullable()
      table.string('cuisine').notNullable()
      table.string('price_ranges').notNullable()
      table.string('menus').notNullable()
      table.string('opening_hours').notNullable()
      table.boolean('takeout').defaultTo(false)
      table.boolean('delivery').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
