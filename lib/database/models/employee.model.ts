import { Document, Schema, model, models } from "mongoose";

export interface IEmployee extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  addressOne: string;
  city: string;
  postcode: string;
  phoneNumber: string;
  dateOfBirth: Date;
  niNumber:string;
  utrNumber:string;
  desiredStart: Date;
  passUrl:string;
  certificateUrl:string;
}

const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  addressOne: { type: String, required: true },
  city: { type: String},
  postcode: { type: String, required: true },
  dateOfBirth: { type: Date, default: Date.now },
  niNumber: { type: String, required: true },
  utrNumber: { type: String },
  desiredStart: { type: Date, default: Date.now },
  passUrl: {type: String, required: true },
  certificateUrl: {type: String, required: true },
})

const Employee = models.Employee || model('Employee', EmployeeSchema);

export default Employee;