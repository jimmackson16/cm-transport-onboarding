
export type CreateEmployeeParams = {
  employee: {
    firstName: string
    lastName: string
    addressOne: string
    city: string
    postcode: string
    phoneNumber: string
    dateOfBirth: Date
    niNumber: string
    utrNumber?:string
    desiredStart: Date
    passUrl: string
    certificateUrl?: string
  }
  path: string
}
