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

type FormInput = z.infer<typeof fileUploadFormSchema>;

interface Pack {
  id: string;
  title: string;
  slug: string;
}

const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === "true";

export default function TrainModelZone() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormInput>({
    resolver: zodResolver(fileUploadFormSchema),
    defaultValues: {
      name: "",
      type: "man",
      pack: "corporate-headshots",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = () => {
    trainModel();
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles: File[] = [];
  
      for (const file of acceptedFiles) {
        if (!files.some((f) => f.name === file.name)) {
          try {
            const compressedFile = await imageCompression(file, {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            });
            newFiles.push(compressedFile);
          } catch (error) {
            console.error('Error compressing file:', error);
          }
        }
      }
  
      // if user tries to upload more than 10 files, display a toast
      if (newFiles.length + files.length > 10) {
        toast({
          title: "Too many images",
          description:
            "You can only upload up to 10 images in total. Please try again.",
          duration: 5000,
        });
        return;
      }
  
      // Add the new files to the existing files array
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    [files, setFiles]
  );

  const removeFile = useCallback(
    (file: File) => {
      setFiles(files.filter((f) => f.name !== file.name));
    },
    [files]
  );

  const trainModel = useCallback(async () => {
    setIsLoading(true);
    // Upload each file to Vercel blob and store the resulting URLs
    const blobUrls = [];

    if (files) {
      for (const file of files) {
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/astria/train-model/image-upload",
        });
        blobUrls.push(blob.url);
      }
    }

    // console.log(blobUrls, "blobUrls");

    const payload = {
      urls: blobUrls,
      name: form.getValues("name").trim(),
      type: form.getValues("type"),
      pack: form.getValues("pack"),
    };

    // Send the JSON payload to the "/astria/train-model" endpoint
    const response = await fetch("/astria/train-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setIsLoading(false);

    if (!response.ok) {
      const responseData = await response.json();
      const responseMessage: string = responseData.message;
      console.error("Something went wrong! ", responseMessage);
      const messageWithButton = (
        <div className="flex flex-col gap-4">
          {responseMessage}
          <a href="/get-credits">
            <Button size="sm">Get Credits</Button>
          </a>
        </div>
      );
      toast({
        title: "Something went wrong!",
        description: responseMessage.includes("Not enough credits")
          ? messageWithButton
          : responseMessage,
        duration: 5000,
      });
      return;
    }

    toast({
      title: "Model queued for training",
      description:
        "The model was queued for training. You will receive an email when the model is ready to use.",
      duration: 5000,
    });

    router.push("/");
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  const modelType = form.watch("type");

  const handleSelectChange = (value: string) => {
    form.setValue("pack", value);
  };

  const [packs, setPacks] = useState<Pack[]>([]);

  const fetchPacks = async (): Promise<void> => {
    try {
      const response = await axios.get<Pack[]>("/astria/packs");
      setPacks(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error fetching packs",
          description: err.message,
          duration: 5000,
        });
      } else {
        toast({
          title: "Unknown error",
          description: "An unknown error occurred.",
          duration: 5000,
        });
      }
    }
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  return (
    <div>

      <div className="border border-stone-300/50 bg-slate-100 rounded-3xl p-6 md:p-12 mb-12 shadow-lg hover:shadow-sm transition-all">
        <h1 className="font-bold italic mb-6 text-xl cursor-pointer">
              <WarningIcon /> How to get the best results?
              {/*<p className="text-sm font-normal not-italic">The quality of the generated images largely depends on the uploaded images. Some tips for excellent results!</p>*/}
        </h1>
        <div className="grid md:grid-cols-12 gap-9 text-sm">
          <div className="col-span-1 md:col-span-7">
              <ul className="list-none text-left ml-1 leading-loose">
                  <li><CheckmarkIcon/><span className="text-green-500 font-bold">Variety is the key:</span> Use different time of day, different background, lighting, clothing on each image.</li>
                  <li><CheckmarkIcon/>Use <span className="text-stone-800 ">6-12 photos</span> that clearly show your face, and no other people on it.</li>
                  <li><CheckmarkIcon/>Upload a few that show your <span className="text-stone-800 ">upper body</span> too.</li>
              </ul>
          </div>
          <div className="col-span-1 md:col-span-5">
              <ul className="list-none text-left ml-1 leading-loose">
                  <li><DontIcon/><span className="text-red-400 font-bold">Don't use</span> a photo that you think is unattractive, grimacing, or blurry.</li>
                  <li><DontIcon/><span className="text-red-400 font-bold">Do not use</span> beauty filters!</li>
              </ul>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md flex flex-col gap-8"
        >

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative w-full mx-auto text-center border  border-stone-300/50 rounded-3xl pt-12 pb-20 hover:shadow-sm transition-all">
                <div className="absolute top-6 left-6 font-thin text-stone-300 text-3xl">1</div>
                <FormDescription className="p-6 text-center text-3xl font-thin text-stone-700 tracking-tighter italic">
                  Give your model a name:
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="e.g. Natalie Portraits"
                    {...field}
                    className="max-w-xs md:max-w-lg mx-auto"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="pack"
          render={({ field }) => (
            <FormItem className="relative w-full mx-auto mt-4 border border-stone-300/50 rounded-3xl pt-12 pb-12 hover:shadow-sm transition-all">
              <div className="absolute top-6 left-6 font-thin text-stone-300 text-3xl">2</div>
              <FormDescription className="text-center text-3xl font-thin text-stone-700 tracking-tighter italic">
                  Pick your pic style
                  <p className="text-sm tracking-normal">All styles are universal and work for all genders</p>
              </FormDescription>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  className="flex flex-col gap-4"
                  value={field.value}
                  onValueChange={(value) => {
                    form.setValue("pack", value);
                  }}
                >
                  <div className="grid md:grid-cols-4 gap-9 mt-6 mb-6 px-6">

                    <div>
                      <RadioGroupItem
                        value="corporate-portraits"
                        id="corporate-portraits"
                        className="peer sr-only"
                        aria-label="corporate-portraits"
                      />
                      <Label
                        htmlFor="corporate-portraits"
                        className="transition-all cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >

                        <div className="relative group">
                        <Dialog>
                          <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                          <Badge variant="outline">Examples</Badge>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Generative Artistic Filters examples</DialogTitle>
                              <DialogDescription>
                                <Image
                                  src="/model-corp.png"
                                  width={1198}
                                  height={1000}
                                  alt="Corporate Portraits"
                                  className="active w-full h-auto mb-2 rounded-md shadow-md">
                                </Image>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3 text-stone-400">24<br/><span className="text-xs">pcs</span></p>
                        <Image
                          src="/corporate.jpg"
                          width={896}
                          height={1152}
                          alt="Corporate Portraits"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>
                        </div>

                        Corporate Portraits
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem
                        value="youtube-covers"
                        id="youtube-covers"
                        className="peer sr-only"
                        aria-label="youtube-covers"
                      />
                      <Label
                        htmlFor="youtube-covers"
                        className="transition-all cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <div className="relative group">
                        <Dialog>
                          <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                          <Badge variant="outline">Examples</Badge>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Youtube Thumbnails</DialogTitle>
                              <DialogDescription>
                                <Image
                                  src="/model-you.png"
                                  width={1300}
                                  height={677}
                                  alt="Youtube Thumbnails"
                                  className="active w-full h-auto mb-2 rounded-md shadow-md">
                                </Image>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3">24<br/><span className="text-xs">pcs</span></p>
                        <Image
                          src="/youtube.jpg"
                          width={896}
                          height={1152}
                          alt="Youtube Thumbnails"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>
                        </div>

                        Youtube Thumbnails
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="ted-speaker"
                        id="ted-speaker"
                        className="peer sr-only"
                        aria-label="ted-speaker"
                      />
                      <Label
                        htmlFor="ted-speaker"
                        className="transition-all cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <div className="relative group">
                        <Dialog>
                          <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                          <Badge variant="outline">Examples</Badge>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Generative Artistic Filters examples</DialogTitle>
                              <DialogDescription>
                                <Image
                                  src="/model-gener.png"
                                  width={1198}
                                  height={1000}
                                  alt="Corporate Portraits"
                                  className="active w-full h-auto mb-2 rounded-md shadow-md">
                                </Image>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3 text-stone-400">24<br/><span className="text-xs">pcs</span></p>
                        <Image
                          src="/ted.jpg"
                          width={896}
                          height={1152}
                          alt="Ted Speaker"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>
                        </div>

                        Ted Speaker
                      </Label>
                    </div>

                  
                   <div>
                      <RadioGroupItem
                        value="glamour-shot"
                        id="glamour-shot"
                        className="peer sr-only"
                        aria-label="glamour-shot"
                      />
                      <Label
                        htmlFor="glamour-shot"
                        className="transition-all cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <div className="relative group">
                        <Dialog>
                          <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                          <Badge variant="outline">Examples</Badge>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Generative Artistic Filters examples</DialogTitle>
                              <DialogDescription>
                                <Image
                                  src="/model-gener.png"
                                  width={1198}
                                  height={1000}
                                  alt="Corporate Portraits"
                                  className="active w-full h-auto mb-2 rounded-md shadow-md">
                                </Image>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3 text-stone-400">24<br/><span className="text-xs">pcs</span></p>
                        <Image
                          src="/glamour.jpg"
                          width={896}
                          height={1152}
                          alt="Aristocratic Portraits"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>
                        </div>

                        Glamour Shot
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="generative-design"
                        id="generative-design"
                        className="peer sr-only"
                        aria-label="generative-design"
                      />
                      <Label
                        htmlFor="generative-design"
                        className="transition-all cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <div className="relative group">
                        <Dialog>
                          <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                            <Badge variant="outline">Examples</Badge>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Generative Artistic Filters examples</DialogTitle>
                              <DialogDescription>
                                <Image
                                  src="/model-gener.png"
                                  width={1198}
                                  height={1000}
                                  alt="Corporate Portraits"
                                  className="active w-full h-auto mb-2 rounded-md shadow-md">
                                </Image>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3">24<br/><span className="text-xs">pcs</span></p>
                        <Image
                          src="/generative.jpg"
                          width={896}
                          height={1152}
                          alt="generative-design"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>
                        </div>

                        Generative Artistic Filters
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="bold-colors"
                        id="bold-colors"
                        className="peer sr-only"
                        aria-label="bold-colors"
                      />
                      <Label
                        htmlFor="bold-colors"
                        className="transition-all cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <div className="relative group">
                        <Dialog>
                          <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                          <Badge variant="outline">Examples</Badge>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Generative Artistic Filters examples</DialogTitle>
                              <DialogDescription>
                                <Image
                                  src="/model-gener.png"
                                  width={1198}
                                  height={1000}
                                  alt="Corporate Portraits"
                                  className="active w-full h-auto mb-2 rounded-md shadow-md">
                                </Image>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3">24<br/><span className="text-xs">pcs</span></p>
                        <Image
                          src="/bold.jpg"
                          width={896}
                          height={1152}
                          alt="Aristocratic Portraits"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>
                        </div>

                        Bold Colors
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="dating"
                        id="dating"
                        className="peer sr-only"
                        aria-label="dating"
                      />
                      <Label
                        htmlFor="dating"
                        className="transition-all cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <div className="relative group">
                        <Dialog>
                          <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                          <Badge variant="outline">Examples</Badge>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Generative Artistic Filters examples</DialogTitle>
                              <DialogDescription>
                                <Image
                                  src="/model-gener.png"
                                  width={1198}
                                  height={1000}
                                  alt="Corporate Portraits"
                                  className="active w-full h-auto mb-2 rounded-md shadow-md">
                                </Image>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3">24<br/><span className="text-xs">pcs</span></p>
                        <Image
                          src="/dating.jpg"
                          width={896}
                          height={1152}
                          alt="dating"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>
                        </div>

                        Dating
                      </Label>
                    </div>
                    <div className="relative group">
                      <RadioGroupItem
                        value="j-crew"
                        id="j-crew"
                        className="peer sr-only"
                        aria-label="j-crew"
                      />
                      <Label
                        htmlFor="j-crew"
                        className="transition-all cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <div className="relative group">
                        <Dialog>
                          <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                          <Badge variant="outline">Examples</Badge>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Generative Artistic Filters examples</DialogTitle>
                              <DialogDescription>
                                <Image
                                  src="/model-gener.png"
                                  width={1198}
                                  height={1000}
                                  alt="Corporate Portraits"
                                  className="active w-full h-auto mb-2 rounded-md shadow-md">
                                </Image>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                        <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3">24<br/><span className="text-xs">pcs</span></p>
                        <Image
                          src="/jcrew.jpg"
                          width={896}
                          height={1152}
                          alt="j-crew"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>
                        </div>

                        J-crew
                      </Label>
                    </div>
                    
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


          <div className="flex flex-col gap-4  mx-auto text-center relative w-full mt-4 border border-stone-300/50 rounded-3xl pt-12 pb-12">
            <div className="absolute top-6 left-6 font-thin text-stone-300 text-3xl">3</div>
            <FormDescription className="mt-6 pb-6 text-center text-3xl font-thin text-stone-700 tracking-tighter italic">
              Select Your Type:
            </FormDescription>
            <RadioGroup
              defaultValue={modelType}
              className="grid grid-cols-3 gap-12 max-w-[460px] mx-auto"
              value={modelType}
              onValueChange={(value) => {
                form.setValue("type", value);
              }}
            >
              <div className="w-32">
                <RadioGroupItem
                  value="man"
                  id="man"
                  className="peer sr-only"
                  aria-label="man"
                />
                <Label
                  htmlFor="man"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                >
                  <FaMale className="mb-3 h-6 w-6" />
                  Man
                </Label>
              </div>

              <div className="w-32">
                <RadioGroupItem
                  value="woman"
                  id="woman"
                  className="peer sr-only"
                  aria-label="woman"
                />
                <Label
                  htmlFor="woman"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                >
                  <FaFemale className="mb-3 h-6 w-6" />
                  Woman
                </Label>
              </div>
              <div className="w-32">
                <RadioGroupItem
                  value="person"
                  id="person"
                  className="peer sr-only"
                  aria-label="person"
                />
                <Label
                  htmlFor="person"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                >
                  <FaRainbow className="mb-3 h-6 w-6" />
                  Unisex
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div
            {...getRootProps()}
            className="relative justify-center align-middle cursor-pointer flex flex-col gap-4 mx-auto w-full border border-stone-300/50 rounded-3xl p-6"
          >
            <div className="absolute top-6 left-6 font-thin text-stone-300 text-3xl">4</div>
            <FormDescription className="mt-12 pb-4 text-center text-3xl font-thin text-stone-700 tracking-tighter italic">
              Upload 4-10 images
            </FormDescription>
            <div className="outline outline-8 outline-stone-400/10 hover:outline-stone-400/20 border border-stone-300 hover:border-green-400 w-full h-full rounded-md p-4 flex justify-center align-middle">
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="self-center">Drop the files here ...</p>
              ) : (
                <div className="flex justify-center flex-col items-center gap-2">
                  <FaImages size={32} className="text-gray-700" />
                  <p className="self-center">
                    Drag 'n' drop some files here, or click to select files.
                  </p>
                </div>
              )}
            </div>
          </div>
          {files.length > 0 && (
            <div className="flex flex-row gap-4 flex-wrap">
              {files.map((file) => (
                <div key={file.name} className="flex flex-col gap-1">
                  <img
                    src={URL.createObjectURL(file)}
                    className="rounded-md w-24 h-24 object-cover"
                  />
                  <Button
                    variant="outline"
                    size={"sm"}
                    className="w-full"
                    onClick={() => removeFile(file)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-fit p-6 mx-auto bg-stone-800 text-stone-300 text-lg" isLoading={isLoading}>
            Create Photos{" "}
            {stripeIsConfigured && <span className="ml-1">(1 Credit)</span>}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function WarningIcon() {
  return (
    <svg className="w-8 h-8 text-green-400 float-left mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  </svg>
  )
}


export function CheckmarkIcon() {
  return (
<svg className="w-4 h-4 text-green-400 float-left mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
</svg>
  )
}

export function DontIcon() {
  return (
<svg className="w-4 h-4 text-red-400 float-left mr-2 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>

  )
}


export function DotsIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-12 h-12 text-stone-100">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>
  )
}






