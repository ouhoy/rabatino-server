import vine from '@vinejs/vine'
import { TourismType } from '#enums/tourism_enum'

// Base Tourism validator schema
const tourismSchema = {
  isActive: vine.boolean(),
  rating: vine.number().min(0).max(5),
  tourismType: vine.enum(Object.values(TourismType)),
}

// Hotel validator
export const hotelValidator = vine.compile(
  vine.object({
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
    attractionType: vine.string(),
    bestVisitTime: vine.string(),
    entryFee: vine.number().min(0),
    openingHours: vine.string(),
    guideTours: vine.boolean(),
  })
)

// Base Tourism validator for shared operations
export const tourismValidator = vine.compile(vine.object(tourismSchema))
