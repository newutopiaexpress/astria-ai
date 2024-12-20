'use client'

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

interface ShareButtonProps {
  imageId: string
  shareId: string
  imageUri: string
}

export function ShareButton({ imageId, shareId, imageUri }: ShareButtonProps) {
  const shareUrl = `${process.env.NEXT_PUBLIC_URL}/share/${shareId}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    toast({ description: "Link copied to clipboard" })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={copyLink}>
          Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}