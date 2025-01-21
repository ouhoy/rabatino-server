import { BaseSchema } from '@adonisjs/lucid/schema'
import { JobType } from '#enums/job_type_enum'
import { WorkLocation } from '#enums/work_location_enum'

export default class extends BaseSchema {
  protected tableName = 'job_posts'

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
      table.string('company').notNullable()
      table.string('logo')
      table.string('salary')
      table.enum('job_type', Object.values(JobType)).notNullable()
      table.enum('work_location', Object.values(WorkLocation)).notNullable()
      table.specificType('requirements', 'text[]').notNullable().defaultTo('{}')
      table.string('application_link')
      table.string('expiry_date')
      table.boolean('is_active').defaultTo(true)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
