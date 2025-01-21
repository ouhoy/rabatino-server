import vine from '@vinejs/vine'

// Business Post validator
export const businessPostValidator = vine.compile(
  vine.object({
    title: vine.string(),
    body: vine.string(),
    featuredImg: vine.string(),
    tags: vine.array(vine.string()),
  })
)

// Update Business Post validator (for partial updates)
export const updateBusinessPostValidator = vine.compile(
  vine.object({
    title: vine.string().optional(),
    body: vine.string().optional(),
    featuredImg: vine.string().optional(),
    tags: vine.array(vine.string()).optional(),
  })
)
