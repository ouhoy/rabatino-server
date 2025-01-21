import vine from '@vinejs/vine'
import { InstitutionType } from '#enums/educational_institution_enum'

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

// Base Educational Institution validator schema
const educationalInstitutionSchema = {
  ...postSchema,
  isVerified: vine.boolean(),
  private: vine.boolean(),
  type: vine.enum(Object.values(InstitutionType)),
}

// University validator
export const universityValidator = vine.compile(
  vine.object({
    ...educationalInstitutionSchema,
    faculties: vine.array(vine.string()),
    ranking: vine.string(),
    accreditation: vine.string(),
    hasHousing: vine.boolean(),
    researchCenters: vine.array(vine.string()),
    facilities: vine.array(vine.string()),
  })
)

// College validator
export const collegeValidator = vine.compile(
  vine.object({
    ...educationalInstitutionSchema,
    departments: vine.array(vine.string()),
    specialization: vine.string(),
    affiliation: vine.string(),
    hasNote: vine.boolean(),
    facilities: vine.array(vine.string()),
  })
)

// Study Center validator
export const studyCenterValidator = vine.compile(
  vine.object({
    ...educationalInstitutionSchema,
    capacity: vine.number().min(1),
    amenities: vine.array(vine.string()),
    hourlyRateRange: vine.array(vine.number()),
    hasAccess: vine.boolean(),
    rooms: vine.array(vine.string()),
  })
)

// Coaching Center validator
export const coachingCenterValidator = vine.compile(
  vine.object({
    ...educationalInstitutionSchema,
    specialty: vine.string(),
    courses: vine.array(vine.string()),
    schedule: vine.string(),
  })
)

// Library validator
export const libraryValidator = vine.compile(
  vine.object({
    ...educationalInstitutionSchema,
    bookCount: vine.number().min(0),
    sections: vine.array(vine.string()),
    hasDigitalAccess: vine.boolean(),
    operationHours: vine.string(),
    hasPrinting: vine.boolean(),
    hasStudyRooms: vine.boolean(),
  })
)

// Base Educational Institution validator for shared operations
export const educationalInstitutionValidator = vine.compile(
  vine.object(educationalInstitutionSchema)
)
