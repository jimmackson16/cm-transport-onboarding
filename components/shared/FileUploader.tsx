'use client'

import { useCallback, Dispatch, SetStateAction, useEffect } from 'react'
import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type FileUploaderProps = {
  onFieldChange: (url: string) => void
  passUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function FileUploader({ passUrl, onFieldChange, setFiles }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*, application/pdf' ? generateClientDropzoneAccept(['image/*, application/pdf']) : undefined,
  })
  
  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
      <input {...getInputProps()} className="cursor-pointer" />

      {passUrl ? (
        <div className="flex h-full w-full flex-1 justify-center items-center">
            File ready
            {/* <img 
            src={ticketUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
            /> */}
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2">Drag Passport/Right to work ID here</h3>
          <p className="p-medium-12 mb-4">PDF,JPEG,PNG (Max 32MB)</p>
          <Button type="button" className="rounded-full">
            Select Passport/Right to work ID from computer
          </Button>
        </div>
      )}
    </div>
  )
}
