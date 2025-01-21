import vine from '@vinejs/vine'

// University validator
export const universityValidator = vine.compile(
  vine.object({
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
    specialty: vine.string(),
    courses: vine.array(vine.string()),
    schedule: vine.string(),
  })
)

// Library validator
export const libraryValidator = vine.compile(
  vine.object({
    bookCount: vine.number().min(0),
    sections: vine.array(vine.string()),
    hasDigitalAccess: vine.boolean(),
    operationHours: vine.string(),
    hasPrinting: vine.boolean(),
    hasStudyRooms: vine.boolean(),
  })
)
