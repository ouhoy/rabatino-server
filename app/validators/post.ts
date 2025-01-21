import vine from '@vinejs/vine'

// Base Post validator schema
const postSchema = {
  title: vine.string(),
  userId: vine.number(),
  typeId: vine.number(),
  description: vine.string(),
  address: vine.string(),
  latitude: vine.number(),
  longitude: vine.number(),
  website: vine.string().optional(),
  phone: vine.string().optional(),
  email: vine.string().email().optional(),
  featuredImage: vine.string(),
}

// University validator
export const postValidator = vine.compile(
  vine.object({
    ...postSchema,
  })
)
