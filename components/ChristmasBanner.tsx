'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function ChristmasBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.4 }}
      className=" bg-stone-200 border-b border-stone-300 text-stone-600 py-1 px-4 flex justify-between items-center z-40"
    >
      <div className="flex  md:flex-1 text-center items-center justify-center">
        <p className="text-sm ml-3 md:ml-0">
            <span className="font-bold italic mr-2 flex-row items-center justify-center">New Style Pack!</span><span className="font-thin italic opacity-75">🎄 24 Magical Elf Portraits</span> 
            <Link href="/login" className="ml-1">
              <Button className="text-xs font-bold border scale-75 bg-white/0 text-stone-500 border-stone-300 rounded-lg">Try Out Now </Button>
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