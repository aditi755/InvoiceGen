import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

interface SubmitButtonProps {
  isPending: boolean
}

export default function SubmitButton({ isPending }: SubmitButtonProps) {
  return (
    <Button type="submit" className="relative w-full font-semibold" disabled={isPending}>
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Submit
    </Button>
  )
}
