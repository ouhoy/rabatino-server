import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'colleges'

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
      table.specificType('departments', 'text[]').notNullable().defaultTo('{}')
      table.string('specialization').notNullable()
      table.string('affiliation').notNullable()
      table.boolean('has_note').defaultTo(false)
      table.specificType('facilities', 'text[]').notNullable().defaultTo('{}')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
