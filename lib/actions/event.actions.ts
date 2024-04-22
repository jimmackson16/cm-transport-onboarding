'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import { handleError } from '@/lib/utils'

import {
  CreateEventParams,
  UpdateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
} from '@/types'
import User from '../database/models/user.model'
import Event from '../database/models/event.model'
import Category from '../database/models/category.model'

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } })
}

const populateEvent = (query: any) => {
  return query
    .populate({ path: 'seller', model: User, select: '_id firstName lastName' })
}

// CREATE
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase()

    const seller = await User.findById(userId)
    if (!seller) {
      throw new Error('Seller not found')
    }

    const newEvent = await Event.create({ ...event, location: event.location, seller: userId })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    handleError(error)
  }
}

// GET ONE EVENT BY ID
export async function getEventById(eventId: string) {
  try {
    await connectToDatabase()

    const event = await populateEvent(Event.findById(eventId))

    if (!event) throw new Error('Event not found')

    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDatabase()

    const eventToUpdate = await Event.findById(event._id)
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found')
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    await connectToDatabase()

    const deletedEvent = await Event.findByIdAndDelete(eventId)
    if (deletedEvent) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL EVENTS
export async function getAllEvents({ query, limit = 6, page }: GetAllEventsParams) {
  try {
    await connectToDatabase()

    const titleOrLocationCondition = query ? {
      $or: [
          { title: { $regex: query, $options: 'i' } },
          { tripLocation: { $regex: query, $options: 'i' } }
      ]
  } : {}

  const skipAmount = (Number(page) - 1) * limit
  const eventsQuery = Event.find(titleOrLocationCondition)
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(limit)

    const events = await populateEvent(eventsQuery)

    const eventsCount = await Event.countDocuments(titleOrLocationCondition)

    return {
        data:JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(eventsCount / limit)
    }

  } catch (error) {
    handleError(error)
  }
}

// GET EVENTS BY ORGANIZER
export async function getEventsByUser({ userId, limit = 6, page }: GetEventsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { organizer: userId }
    const skipAmount = (page - 1) * limit

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
// export async function getRelatedEventsByCategory({
//   categoryId,
//   eventId,
//   limit = 3,
//   page = 1,
// }: GetRelatedEventsByCategoryParams) {
//   try {
//     await connectToDatabase()

//     const skipAmount = (Number(page) - 1) * limit
//     const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

//     const eventsQuery = Event.find(conditions)
//       .sort({ createdAt: 'desc' })
//       .skip(skipAmount)
//       .limit(limit)

//     const events = await populateEvent(eventsQuery)
//     const eventsCount = await Event.countDocuments(conditions)

//     return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
//   } catch (error) {
//     handleError(error)
//   }
// }

// export const getAllEventsByLocation = async ({query, limit=6, page}:GetAllTripsParams) => {
//   try {
//       await connectToDatabase()

//       const titleCondition = query ? { location: { $regex: query, $options: 'i' } } : {}
//       const conditions = {
//       $and: [titleCondition],
//     }

//     const skipAmount = (Number(page) - 1) * limit
//     const eventsQuery = Event.find(conditions)
//       .sort({ createdAt: 'desc' })
//       .skip(skipAmount)
//       .limit(limit)

//       const trips = await populateEvent(tripsQuery)

//       const tripsCount = await Event.countDocuments(conditions)

//       return {
//           data:JSON.parse(JSON.stringify(trips)),
//           totalPages: Math.ceil(tripsCount / limit)
//       }

//   } catch (error) {
//       handleError(error)
//   }
// }