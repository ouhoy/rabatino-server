import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'hotels'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('tourism_id')
        .unsigned()
        .references('id')
        .inTable('tourism')
        .onDelete('CASCADE')
        .notNullable()
      table.specificType('amenities', 'text[]').notNullable().defaultTo('{}')
      table.string('price_ranges').notNullable()
      table.integer('total_rooms').notNullable()
      table.string('room_types').notNullable()
      table.string('check_in_time').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
