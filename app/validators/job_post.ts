import vine from '@vinejs/vine'
import { JobType } from '#enums/job_type_enum'
import { WorkLocation } from '#enums/work_location_enum'

// Job Post validator
export const jobPostValidator = vine.compile(
  vine.object({
    company: vine.string(),
    logo: vine.string(),
    salary: vine.string(),
    jobType: vine.enum(Object.values(JobType)),
    workLocation: vine.enum(Object.values(WorkLocation)),
    requirements: vine.array(vine.string()),
    applicationLink: vine.string().url(),
    expiryDate: vine.string(),
    isActive: vine.boolean(),
  })
)
