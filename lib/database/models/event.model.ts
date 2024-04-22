import { Document, Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  seatInfo: string;
  location: string;
  createdAt: Date;
  startDateTime: Date;
  ticketUrl:string;
  price: string;
  quantity: number;
  url?: string;
  seller: { _id: string, firstName: string, lastName: string }
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  seatInfo: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  startDateTime: { type: Date, default: Date.now },
  ticketUrl: {type: String,required:false},
  price: { type: String },
  quantity: {type:Number},
  url: { type: String },
  seller: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Event = models.Event || model('Event', EventSchema);

export default Event;