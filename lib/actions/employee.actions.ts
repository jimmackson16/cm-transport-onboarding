'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '../database'
import { handleError } from '@/lib/utils'

import {
  CreateEmployeeParams,
} from '@/types'
import Employee from '../database/models/employee.model'



// CREATE
export async function createEmployee({ employee, path }: CreateEmployeeParams) {
  try {
    await connectToDatabase()

    const newEmployee = await Employee.create({ ...employee })
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newEmployee))
  } catch (error) {
    handleError(error)
  }
}