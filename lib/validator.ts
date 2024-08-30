import * as z from "zod"

export const employeeFormSchema = z.object({
  firstName: z.string().min(2, 'Enter first name'),
  lastName: z.string().min(2, 'Enter last name'),
  addressOne: z.string().min(3, 'Enter address'),
  city: z.string().min(3, 'Enter city'),
  postcode: z.string().min(3, 'Enter postcode'),
  phoneNumber: z.string().min(3, 'Enter phone number'),
  dateOfBirth: z.date(),
  niNumber: z.string().min(2, 'Enter your NI number').max(9),
  utrNumber: z.string(),
  desiredStart: z.date(),
  passUrl:z.string(),
  certificateUrl: z.string(),
})

// firstName: '',
// lastName: '',
// addressOne: '',
// city:'',
// postcode:'',
// phoneNumber:'',
// dateOfBirth:'',
// niNumber:'',
// utrNumber:'',
// desiredStart: new Date(),
// passUrl:'',
// certificateUrl:'',