"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useRef, useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import { useUploadThing } from '@/lib/uploadthing'
// import Geosuggest from '@ubilabs/react-geosuggest';
// import Script from 'next/script';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"



type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  event?: IEvent,
  eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [city, setCity] = useState<string>('');
  const router = useRouter()
  // const geosuggestEl = useRef<any>(null);
  const initialValues = event && type === 'Update' 
    ? { 
      ...event, 
      startDateTime: new Date(event.startDateTime), 
      endDateTime: new Date(event.endDateTime) 
    }
    : eventDefaultValues;

  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })
 
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.ticketUrl;

    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if(type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, ticketUrl: uploadedImageUrl },
          userId,
          path: '/profile'
        })

        if(newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(type === 'Update') {
      if(!eventId) {
        router.back()
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, ticketUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`
        })

        if(updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
    {/* <Script
        src={GOOGLE_MAPS}
        strategy="beforeInteractive"
      /> */}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col gap-5"
      >

        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="Event/Concert name" {...field} 
                className='input-field'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="Please enter the amount of tickets available" {...field} 
                className='input-field'
                type="number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="seatInfo"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl className='h-72'>
                <Textarea 
                placeholder="Please provide seat info and any other information" {...field} 
                className='textarea rounded-2xl'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ticketUrl"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl className='h-72'>
                <FileUploader 
                onFieldChange={field.onChange}
                imageUrl={field.value}
                setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        
    

        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <div className='flex-center h-[54px] w-full overflow-hidden
                rounded-full bg-grey-50 px-4 py-2'>
                    <Image 
                    src='/assets/icons/calendar.svg' 
                    alt='calendar'
                    width={24}
                    height={24}
                    className='filter-grey'
                    />
                    <p className='ml-3 whitespace-nowrap text-grey-600'>Start Date:</p>
                    <DatePicker 
                    selected={field.value} 
                    onChange={(date: Date) => field.onChange(date)} 
                    dateFormat="MM/dd/yyyy"
                    wrapperClassName='datePicker'
                    />
                </div>
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/dollar.svg"
                        alt="dollar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                      
                              </div>
          
                            </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                  />  
        </div>


     <div className='flex flex-col gap-5 md:flex-row'>
     <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="Event location (City and Country)" {...field} 
                className='input-field'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <div className='flex-center h-[54px] w-full overflow-hidden
                rounded-full bg-grey-50 px-4 py-2'>
                    <Image 
                    src='/assets/icons/link.svg' 
                    alt='link'
                    width={24}
                    height={24}
                    />
                    <Input 
                    placeholder="URL for any events you are attending etc, your website etc." 
                    {...field}
                    className='input-field'
                    />
                </div>
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
     </div>

        <Button 
        type="submit" 
        size='lg' 
        disabled={form.formState.isSubmitting}
        className='button col-span-2 w-full'
        >
        {form.formState.isSubmitting ? 'Submitting' : `${type} Trip`}
        </Button>
      </form>
    </Form>
    </>
  )
}

export default EventForm