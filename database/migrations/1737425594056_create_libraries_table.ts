import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'libraries'

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
      table.integer('book_count').notNullable()
      table.specificType('sections', 'text[]').notNullable().defaultTo('{}')
      table.boolean('has_digital_access').defaultTo(false)
      table.string('operation_hours').notNullable()
      table.boolean('has_printing').defaultTo(false)
      table.boolean('has_study_rooms').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
