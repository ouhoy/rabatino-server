import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'study_centers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('educational_institution_id')
        .unsigned()
        .references('id')
        .inTable('educational_institutions')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('capacity').notNullable()
      table.specificType('amenities', 'text[]').notNullable().defaultTo('{}')
      table.specificType('hourly_rate_range', 'integer[]').notNullable().defaultTo('{}')
      table.boolean('has_24_access').defaultTo(false)
      table.specificType('rooms', 'text[]').notNullable().defaultTo('{}')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
