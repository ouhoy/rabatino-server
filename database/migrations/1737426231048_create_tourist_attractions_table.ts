import { BaseSchema } from '@adonisjs/lucid/schema'

// Fixed the migration file

export default class extends BaseSchema {
  protected tableName = 'tourist_attractions'

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
      table.string('attraction_type').notNullable()
      table.string('best_visit_time').notNullable()
      table.decimal('entry_fee', 10, 2).notNullable()
      table.string('opening_hours').notNullable()
      table.boolean('guide_tours').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
