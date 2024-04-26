"use client"
import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { updateEventAfterOrder } from '@/lib/actions/order.actions'

type EventProps = {
    eventId: string
}

const UpdatePurchasedButton = ({eventId}:EventProps) => {
    const [isPending,startTransition] = useTransition()
    
    const updatePurchased = async () => {
        try {
          await updateEventAfterOrder(eventId)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <Button onClick={()=>startTransition(updatePurchased)}>
        purchased
    </Button>
  )
}

export default UpdatePurchasedButton