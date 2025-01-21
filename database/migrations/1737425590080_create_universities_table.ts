import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'universities'

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
      table.specificType('faculties', 'text[]').notNullable().defaultTo('{}')
      table.string('ranking')
      table.string('accreditation')
      table.boolean('has_housing').defaultTo(false)
      table.specificType('research_centers', 'text[]').notNullable().defaultTo('{}')
      table.specificType('facilities', 'text[]').notNullable().defaultTo('{}')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
