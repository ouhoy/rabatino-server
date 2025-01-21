import vine from '@vinejs/vine'
import { JobType } from '#enums/job_type_enum'
import { WorkLocation } from '#enums/work_location_enum'

// Base Post validator schema
const postSchema = {
  title: vine.string(),
  description: vine.string(),
  address: vine.string(),
  latitude: vine.number(),
  longitude: vine.number(),
  website: vine.string().optional(),
  phone: vine.string().optional(),
  email: vine.string().email().optional(),
  featuredImage: vine.string(),
}

// Job Post validator
export const jobPostValidator = vine.compile(
  vine.object({
    ...postSchema,
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

// Update Job Post validator (for partial updates)
export const updateJobPostValidator = vine.compile(
  vine.object({
    ...postSchema,
    company: vine.string().optional(),
    logo: vine.string().optional(),
    salary: vine.string().optional(),
    jobType: vine.enum(Object.values(JobType)).optional(),
    workLocation: vine.enum(Object.values(WorkLocation)).optional(),
    requirements: vine.array(vine.string()).optional(),
    applicationLink: vine.string().url().optional(),
    expiryDate: vine.string().optional(),
    isActive: vine.boolean().optional(),
  })
)
