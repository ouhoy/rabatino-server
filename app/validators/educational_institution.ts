import vine from '@vinejs/vine'
import { InstitutionType } from '#enums/educational_institution_enum'

// Base Educational Institution validator schema
export const educationalInstitutionSchema = {
  isVerified: vine.boolean(),
  private: vine.boolean(),
  institutionType: vine.enum(Object.values(InstitutionType)),
}

// University validator
export const educationalInstitutionValidator = vine.compile(
  vine.object({
    ...educationalInstitutionSchema,
  })
)
