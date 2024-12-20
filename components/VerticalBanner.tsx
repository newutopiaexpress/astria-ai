'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function VerticalBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="w-[30px] h-screen bg-black text-stone-600 py-2 px-4 flex justify-between items-center z-40">
      <div className="flex  md:flex-1 text-center items-center justify-start px-2">
        <div className="text-[11px] tracking-tight ml-2 md:ml-0">
            <span className="font-semibold italic mr-2 flex-row items-center justify-start">
              Turn Your Child into a Real Christmas Elf!

            </span><span className="font-normal italic opacity-75"></span> 
            <Link href="/login" className="ml-0">
              <Button className="text-[11px] font-bold border scale-75 bg-white/0 text-stone-500 hover:text-stone-300 border-stone-300 rounded-lg">CREATE NOW </Button>
            </Link>
         </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-stone-600 hover:text-stone-800 transition-colors"
        aria-label="Close banner"
      >
        <X className="h-4 w-4 mr-0" />
      </button>
    </div>
  )
}