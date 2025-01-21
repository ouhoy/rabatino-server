import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'coaching_centers'

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
      table.string('specialty').notNullable()
      table.specificType('courses', 'text[]').notNullable().defaultTo('{}')
      table.string('schedule').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
