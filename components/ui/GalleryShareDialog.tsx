"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";
import { Share2, Gift, Twitter, Facebook, Linkedin, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "./use-toast";

interface GalleryShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  galleryUrl: string;
  images: { uri: string }[];
}

export function GalleryShareDialog({ open, onOpenChange, galleryUrl, images }: GalleryShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(galleryUrl);
    setCopied(true);
    toast({ description: "Gallery link copied! Share it with your friends." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Gallery
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
            {images.map((image, index) => (
              <img 
                key={index}
                src={image.uri} 
                alt={`Gallery image ${index + 1}`}
                className="rounded-lg w-full h-32 object-cover"
              />
            ))}
          </div>
          
          {/* Social sharing buttons */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-center gap-2">
              {/* ... social sharing buttons (same as ShareDialog) ... */}
            </div>
            
            <Button 
              onClick={copyToClipboard} 
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Gift className="h-4 w-4" />
                  Send Gallery as Gift
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
