import vine from '@vinejs/vine'
import { TourismType } from '#enums/tourism_enum'

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

// Base Tourism validator schema
const tourismSchema = {
  ...postSchema,
  isActive: vine.boolean(),
  rating: vine.number().min(0).max(5),
  type: vine.enum(Object.values(TourismType)),
}

// Hotel validator
export const hotelValidator = vine.compile(
  vine.object({
    ...tourismSchema,
    amenities: vine.array(vine.string()),
    priceRanges: vine.string(),
    totalRooms: vine.number().min(1),
    roomTypes: vine.string(),
    checkInTime: vine.string(),
  })
)

// Restaurant validator
export const restaurantValidator = vine.compile(
  vine.object({
    ...tourismSchema,
    cuisine: vine.string(),
    priceRanges: vine.string(),
    menus: vine.string(),
    openingHours: vine.string(),
    takeout: vine.boolean(),
    delivery: vine.boolean(),
  })
)

// Tourist Attraction validator
export const touristAttractionValidator = vine.compile(
  vine.object({
    ...tourismSchema,
    attractionType: vine.string(),
    bestVisitTime: vine.string(),
    entryFee: vine.number().min(0),
    openingHours: vine.string(),
    guideTours: vine.boolean(),
  })
)

// Base Tourism validator for shared operations
export const tourismValidator = vine.compile(vine.object(tourismSchema))
