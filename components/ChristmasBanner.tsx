'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function ChristmasBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -600 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.6 }}
      className="absolute top-20 w-full h-8 bg-teal-300 text-stone-800 border-b border-stone-300 py-4 px-4 flex justify-between items-center z-40"
    >
      <div className="flex text-center items-center justify-center px-2 mx-auto">
        <div className="text-[12px] tracking-tight ml-6 text-center mx-auto">
            <span className="font-semibold italic mr-2 flex-row items-center justify-center">
              Turn Your Child into a Real Christmas Elf!

            </span>
            <span className="font-normal italic opacity-75"></span> 
            {/*<Link href="/login" className="ml-0">
              <Button className="text-[12px] font-bold border scale-75 bg-white/0 text-stone-500 hover:text-stone-300 border-stone-300 rounded-lg">CREATE NOW </Button>
            </Link>*/}
            <button
                onClick={() => setIsVisible(false)}
                className="text-stone-600 hover:text-stone-800 transition-colors"
                aria-label="Close banner"
              >
                <X className="h-4 w-4 mr-6 z-50" />
              </button>
         </div>
      </div>
    </motion.div>
  )
}