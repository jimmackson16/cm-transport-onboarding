'use client'

import { useCallback, Dispatch, SetStateAction, useEffect } from 'react'
import type { FileWithPath } from '@uploadthing/react'
import { useDropzone } from '@uploadthing/react/hooks'
import { generateClientDropzoneAccept } from 'uploadthing/client'

import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'

type CertUploaderProps = {
  onFieldChange: (url: string) => void
  certificateUrl: string
  setFiles: Dispatch<SetStateAction<File[]>>
}

export function CertUploader({ certificateUrl, onFieldChange, setFiles }: CertUploaderProps) {
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

      {certificateUrl ? (
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
          <h3 className="mb-2 mt-2">Drag A Level/BTEC or Equivalent from computer here (Not required)</h3>
          <p className="p-medium-10 mb-4">Please upload your transcript or your certificates as a single file</p>
          <p className="p-medium-10 mb-4">Note: This is only to be considered for senior roles</p>
          <p className="p-medium-10 mb-4">PDF,JPEG,PNG (Max 32MB)</p>
          <Button type="button" className="rounded-full">
          Select A Level/BTEC or Equivalent from computer (Not required)
          </Button>
        </div>
      )}
    </div>
  )
}
