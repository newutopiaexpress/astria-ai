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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
      className=" bg-stone-200/70 hover:bg-stone-200/100 backdrop-blur-sm border-b border-stone-300 text-stone-600 py-2 px-4 flex justify-between items-center z-40"
    >
      <div className="flex  md:flex-1 text-center items-center justify-center">
        <p className="text-[12px] ml-3 md:ml-0">
            <span className="font-semibold italic mr-2 flex-row items-center justify-center">
              <Image src="/elf/elf1.png" width={100} height={100} alt="elf" className="float-left w-10 h-10 rounded-full mr-4" /> 
              Turn Your Child into a Real Christmas Elf!
            </span><span className="font-normal italic opacity-75"></span> 
            <Link href="/login" className="ml-1">
              <Button className="text-xs font-bold border scale-75 bg-white/0 text-stone-500 hover:text-stone-300 border-stone-300 rounded-lg">CREATE NOW </Button>
            </Link>
         </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-stone-600 hover:text-stone-800 transition-colors"
        aria-label="Close banner"
      >
        <X className="h-4 w-4 mr-5" />
      </button>
    </motion.div>
  )
}