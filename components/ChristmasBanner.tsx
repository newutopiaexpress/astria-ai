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
      transition={{ duration: 0.5, ease: 'easeInOut', delay: 3 }}
      className="bg-rose-300/10 border-b text-white py-1 px-4 flex justify-between items-center z-40"
    >
      <div className="flex-1 text-center">
        <p className="text-xs text-stone-600">
          <span className="font-extrabold mr-2">Trial Offer!</span>
          <span className="mr-2">24 photos in the chosen style + 24 FREE photo in Photoshoot Portrait Style</span>
          <span className="font-normal text-2xl ">
            4<span className="text-xs align-top border-b border-stone-600">99</span><span className="font-normal text-xs">€</span>
            <Link href="/login" className="ml-4 ">
              <Button variant="christmas">Try Out Now </Button>
            </Link>
          </span>
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-stone-600 hover:text-stone-800 transition-colors"
        aria-label="Close banner"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  )
}