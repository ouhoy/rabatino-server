import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('address').notNullable()
      table.decimal('latitude', 10, 8).notNullable()
      table.decimal('longitude', 11, 8).notNullable()
      table.string('website').nullable()
      table.string('phone').nullable()
      table.integer('views').defaultTo(0)
      table.string('email').nullable()
      table.string('featured_image').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
