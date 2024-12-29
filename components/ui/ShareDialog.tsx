"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Share2, Gift, Twitter, Facebook, Linkedin, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "./use-toast";

interface ShareDialogProps {
  imageUrl: string;
  shareUrl: string;
}

export function ShareDialog({ imageUrl, shareUrl }: ShareDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ description: "Link copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const openInNewTab = () => {
    window.open(shareUrl, '_blank');
  };

  const shareToSocial = (platform: string) => {
    const text = "Check out this AI-generated photo I created!";
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Your Creation
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="relative h-auto w-full overflow-hidden rounded-lg">
            <img 
              src={imageUrl} 
              alt="Share preview" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300" 
            />
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-center gap-2">
              <Button 
                onClick={() => shareToSocial('twitter')} 
                variant="outline" 
                className="flex-1 flex items-center gap-2"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button 
                onClick={() => shareToSocial('facebook')} 
                variant="outline"
                className="flex-1 flex items-center gap-2"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
              <Button 
                onClick={() => shareToSocial('linkedin')} 
                variant="outline"
                className="flex-1 flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button 
                onClick={copyToClipboard} 
                className="flex-1 flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Gift className="h-4 w-4" />
                    Copy Link
                  </>
                )}
              </Button>
              {copied && (
                <Button 
                  onClick={openInNewTab}
                  variant="outline" 
                  className="flex-1 flex items-center gap-2"
                >
                  Open in new tab
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
