"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaFemale, FaImages, FaMale, FaRainbow } from "react-icons/fa";
import * as z from "zod";
import { fileUploadFormSchema } from "@/types/zod";
import { upload } from "@vercel/blob/client";
import axios from "axios";
import Image from "next/image";
import FaqDialog from "@/components/FaqDialog";

import imageCompression from 'browser-image-compression';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "./ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Define pack data structure
interface PackOption {
  id: string;
  value: string;
  title: string;
  description: string;
  previewImage: string;
  exampleImages: string[]; // Change from single exampleImage to array
  pieces: number;
  subjects: string[]; // Add this new field
  isNew?: boolean;
}

// Pack options data /2025BigMan.png
const packOptions: PackOption[] = [
  {
    id: "corporate-portraits-v2",
    value: "corporate-portraits-v2",
    title: "Corporate Portraits",
    description: "Look like a CEO, in just one click",
    previewImage: "/corporate.jpg",
    exampleImages: ["/model-corp.png"], // Add multiple images
    pieces: 24,
    subjects: ["Woman", "Man"], // Add subjects
    isNew: true,
  },
  {
    id: "motivational-board",
    value: "motivational-board",
    title: "Peak You",
    description: "See it, believe it, achieve it!",
    previewImage: "/m1.jpg",
    exampleImages: ["/insp.png"], // Add multiple images
    pieces: 24,
    subjects: ["Woman", "Man"], // Add subjects
    isNew: true,
  },
  {
    id: "budoir",
    value: "budoir",
    title: "Holiday Glamour",
    description: "Holiday Glamour - Unwrap your inner goddess",
    previewImage: "/bud/05.jpg",
    exampleImages: ["/bud/bud.png"], // Add multiple images
    pieces: 24,
    subjects: ["Woman"], // Add subjects
    isNew: true,
  },
  {
    id: "dating-pack",
    value: "dating-pack",
    title: "Dating Profile",
    description: "To let the love of your life find you easier",
    previewImage: "/date/01.jpg",
    exampleImages: ["/date/date.png"], // Add multiple images
    pieces: 24,
    subjects: ["Woman"], // Add subjects
    isNew: true,
  },
  {
    id: "realtor-v2",
    value: "realtor-v2",
    title: "Real Estate Profile",
    description: "Your Key to Looking Like a Top-Selling Agent!",
    previewImage: "/real/8.jpg",
    exampleImages: ["/real/realB.png"], // Add multiple images
    pieces: 24,
    subjects: ["Woman", "Man"], // Add subjects
    isNew: true,
  },

];

export default function TrainModelZonePacks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-4 lg:gap-6 mx-auto pt-4">
      {packOptions.map((pack) => (
        <div key={pack.id}>
          <RadioGroupItem
            value={pack.value}
            id={pack.id}
            className="peer sr-only"
            aria-label={pack.id}
          />
          <Label
            htmlFor={pack.id}
            className="shadow-lg pb-2 transition-all cursor-pointer flex flex-col items-center justify-between rounded-md border border-stone-300 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline outline-0 outline-stone-300 hover:outline hover:outline-offset-8 hover:outline-8 hover:outline-stone-300/50 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-2 peer-data-[state=checked]:outline-green-400/80 peer-data-[state=checked]:outline-offset-0 peer-data-[state=checked]:shadow-lg"
          >
            <div className="relative group">
              <Dialog>
                <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                  <Badge variant="examples">Examples</Badge>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col">
                  <DialogHeader>
                    <DialogTitle>{pack.description}</DialogTitle>
                    <DialogDescription className="flex-1 overflow-hidden">
                      <Carousel className="w-full h-full">
                        <CarouselContent className="h-full">
                          {pack.exampleImages.map((image, index) => (
                            <CarouselItem key={index} className="h-[calc(90vh-120px)]">
                              <div className="relative w-full h-full">
                                <Image
                                  src={image}
                                  fill
                                  alt={`${pack.title} example ${index + 1}`}
                                  className="object-contain"
                                  priority
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <div className="flex justify-center gap-2 mt-4">
                          <CarouselPrevious />
                          <CarouselNext />
                        </div>
                      </Carousel>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {/* Pieces count badge */}
              <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3 text-stone-400">
                {pack.pieces}<br/><span className="text-xs">pcs</span>
              </p>

              {/* Preview Image */}
              <Image
                src={pack.previewImage}
                width={896}
                height={1152}
                alt={pack.title}
                className="w-80 h-auto mb-2 rounded-tl-md rounded-tr-md"
              />
            </div>

            {/* Pack Title */}
            <span className="text-sm font-medium">{pack.title}</span>

            {/* Subject Labels */}
            <div className="flex flex-wrap justify-center mt-2">
              {pack.subjects.map((subject, index) => (
                <Badge key={index} variant="secondary" className="text-stone-400 text-[10px]  md:text-[11px] px-1 md:px-2 mr-1 mb-1">
                  {subject}
                </Badge>
              ))}
            </div>
          </Label>
        </div>
      ))}
    </div>
  );
}