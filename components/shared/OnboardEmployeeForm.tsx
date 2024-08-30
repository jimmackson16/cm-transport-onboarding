"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { employeeFormSchema } from "@/lib/validator"
import * as z from 'zod'
import {  onboardingDefaultValues } from "@/constants"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import { useUploadThing } from '@/lib/uploadthing'
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation"
import { IEmployee } from "@/lib/database/models/employee.model"
import { CertUploader } from "./CertUploader"
import { createEmployee } from "@/lib/actions/employee.actions"



type EmployeeFormProps = {
  employee?: IEmployee,
}

const OnboardEmployeeForm = ({ employee }: EmployeeFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [certFiles, setCertFiles] = useState<File[]>([])
  const router = useRouter()
  const initialValues = onboardingDefaultValues

  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: initialValues
  })
 
  async function onSubmit(values: z.infer<typeof employeeFormSchema>) {
    let uploadedImageUrl = values.passUrl;
    let uploadedCertUrl = values.certificateUrl;

    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if(certFiles.length > 0) {
      const uploadedCerts = await startUpload(certFiles)

      if(!uploadedCerts) {
        return
      }

      uploadedCertUrl = uploadedCerts[0].url
    }

      try {
        const newEmployee = await createEmployee({
          employee: { ...values, passUrl: uploadedImageUrl, certificateUrl: uploadedCertUrl },
          path: '/thank-you'
        })

        if(newEmployee) {
          form.reset();
          router.push(`/thank-you`)
        }
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="flex flex-col gap-5"
      >

        <div className='flex flex-col gap-5 md:flex-row'>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="First Name" {...field} 
                className='input-field'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="Last Name" {...field} 
                className='input-field'
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
          name="addressOne"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="Address" {...field} 
                className='input-field'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="City" {...field} 
                className='input-field'
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
          name="postcode"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="Postcode" {...field} 
                className='input-field'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="Phone number" {...field} 
                className='input-field'
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
          name="niNumber"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="NI Number" {...field} 
                className='input-field'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="utrNumber"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input placeholder="UTR Number (Not required)" {...field} 
                className='input-field'
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
          name="dateOfBirth"
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
                    <p className='ml-3 whitespace-nowrap text-grey-600'>Date of birth</p>
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
          name="desiredStart"
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
                    <p className='ml-3 whitespace-nowrap text-grey-600'>Desired Start Date:</p>
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
        
        </div>

        <div className='flex flex-col gap-5 md:flex-row'>

        <FormField
          control={form.control}
          name="passUrl"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl className='h-72'>
                <FileUploader 
                onFieldChange={field.onChange}
                passUrl={field.value}
                setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
            <FormField
          control={form.control}
          name="certificateUrl"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl className='h-72'>
                <CertUploader 
                onFieldChange={field.onChange}
                certificateUrl={field.value}
                setFiles={setCertFiles}
                />
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
        {form.formState.isSubmitting ? 'Submitting (please wait to be redirected)' : `Submit`}
        </Button>
      </form>
    </Form>
    </>
  )
}

export default OnboardEmployeeForm