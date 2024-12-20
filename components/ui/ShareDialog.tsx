import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "./use-toast";

interface ShareDialogProps {
  imageUrl: string;
  shareUrl: string;
}

export function ShareDialog({ imageUrl, shareUrl }: ShareDialogProps) {
  const [open, setOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({ description: "Link copied to clipboard!" });
  };

  const shareToSocial = (platform: string) => {
    const text = "I made this with Utopia Photos";
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Image</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <img src={imageUrl} alt="Share preview" className="rounded-md max-h-[500px] w-auto" />
          <div className="flex gap-2">
            <Button onClick={() => shareToSocial('twitter')}>Twitter</Button>
            <Button onClick={() => shareToSocial('facebook')}>Facebook</Button>
            <Button onClick={() => shareToSocial('linkedin')}>LinkedIn</Button>
          </div>
          <Button onClick={copyToClipboard} variant="outline">
            Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
