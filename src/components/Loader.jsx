import React from 'react'
import { LoaderCircle } from 'lucide-react'

export default function Loader() {
  return (
    <main className="min-h-screen min-w-screen grid place-items-center bg-gray-300/50">
      <span className="animate-spin">
        <LoaderCircle size={150} />
      </span>
    </main>
  )
}
