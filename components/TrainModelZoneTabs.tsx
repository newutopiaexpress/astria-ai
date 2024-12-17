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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";


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
  const [currentStep, setCurrentStep] = useState(1);

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

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return form.getValues("name").trim().length > 0;
      case 2:
        return form.getValues("pack") !== "";
      case 3:
        return form.getValues("type") !== "";
      case 4:
        return files.length >= 6 && files.length <= 10;
      default:
        return false;
    }
  };

  return (
    <div className="grid grid-cols-12 w-full rounded-3xl relative">
      <div className="col-span-12 md:col-span-12 bg-stone-100/0 z-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-md flex flex-col"
          >
            {/* Step 1 - Name */}
            {currentStep === 1 && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <div>
                    <FormItem className="relative w-full p-6 mx-auto pb-12">
                      <FormDescription className="z-10 p-6 text-center text-2xl font-thin text-stone-700 tracking-tight">
                        <Badge className="w-10 h-10 rounded-full p-4 text-center bg-stone-200 border-stone-300">1</Badge>
                        <br/>
                        <Separator orientation="vertical" className="bg-stone-300 mx-auto h-10"/>
                        Give your model a name
                      </FormDescription>
                      <FormControl>
                        <Input
                          placeholder="e.g. Natalie Portraits"
                          {...field}
                          className="z-50 max-w-xs md:max-w-md mx-auto"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            )}

            {/* Step 2 - Style Pack */}
            {currentStep === 2 && (
              <FormField
                control={form.control}
                name="pack"
                render={({ field }) => (
                  <FormItem className="relative w-full lg:max-w-[1400px] mx-auto rounded-tr-2xl rounded-br-3xl bg-transparent rounded-bl-3xl pb-9 transition-all">
                    <FormDescription className="p-6 text-center text-2xl font-thin text-stone-700 tracking-tight">
                    Choose a Style Pack
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
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 lg:gap-12 mx-auto pt-4">
                          <div>
                                                <RadioGroupItem
                                                  value="corporate-headshots"
                                                  id="corporate-headshots"
                                                  className="peer sr-only"
                                                  aria-label="corporate-headshots"
                                                />
                                                <Label
                                                  htmlFor="corporate-headshots"
                                                  className="shadow-lg pb-2 transition-all cursor-pointer flex flex-col items-center justify-between rounded-md border border-stone-300 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-offset-8 hover:outline-8 hover:outline-stone-300/50 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-2  peer-data-[state=checked]:outline-green-400/80 peer-data-[state=checked]:outline-offset-0 peer-data-[state=checked]:shadow-lg"
                                                >
                          
                                                  <div className="relative group">
                                                  <Dialog>
                                                    <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                                                    <Badge variant="examples">Examples</Badge>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                      <DialogHeader>
                                                        <DialogTitle>Corporate Portraits - Look like a CEO, in just one click</DialogTitle>
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
                                                    className="active w-80 h-auto mb-2 rounded-tl-md rounded-tr-md">
                                                  </Image>
                                                  </div>
                          
                                                  Corporate Portraits
                                                </Label>
                                              </div>
                                              
                                              <div>
                                                <RadioGroupItem
                                                  value="cool-christmas"
                                                  id="cool-christmas"
                                                  className="peer sr-only"
                                                  aria-label="cool-christmas"
                                                />
                                                <Label
                                                  htmlFor="cool-christmas"
                                                  className="shadow-lg pb-2 transition-all cursor-pointer flex flex-col items-center justify-between rounded-md border border-stone-300 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-offset-8 hover:outline-8 hover:outline-stone-300/50 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-2  peer-data-[state=checked]:outline-green-400/80 peer-data-[state=checked]:outline-offset-0 peer-data-[state=checked]:shadow-lg"
                                                >
                          
                                                  <div className="relative group">
                                                  <Dialog>
                                                    <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                                                    <Badge variant="examples">Examples</Badge>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                      <DialogHeader>
                                                        <DialogTitle>Santa got an upgrade - your holidays just got cooler!</DialogTitle>
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
                                                    src="/xmasx.jpg"
                                                    width={1792}
                                                    height={2304}
                                                    alt="Corporate Portraits"
                                                    className="active w-80 h-auto mb-2 rounded-tl-md rounded-tr-md">
                                                  </Image>
                                                  </div>
                          
                                                  Cool Christmas
                                                </Label>
                                              </div>
                                              
                                              <div>
                                                <RadioGroupItem
                                                  value="christmas-elf"
                                                  id="christmas-elf"
                                                  className="peer sr-only"
                                                  aria-label="christmas-elf"
                                                />
                                                <Label
                                                  htmlFor="christmas-elf"
                                                  className="shadow-lg pb-2 transition-all cursor-pointer flex flex-col items-center justify-between rounded-md border border-stone-300 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-offset-8 hover:outline-8 hover:outline-stone-300/50 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-2  peer-data-[state=checked]:outline-green-400/80 peer-data-[state=checked]:outline-offset-0 peer-data-[state=checked]:shadow-lg"
                                                >
                                                  <div className="relative group">
                                                  <Dialog>
                                                    <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                                                    <Badge variant="examples">Examples</Badge>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                      <DialogHeader>
                                                        <DialogTitle>Warning: May cause pointy ears and excessive joy!</DialogTitle>
                                                        <DialogDescription>
                                                          <Image
                                                            src="/elfprev.png"
                                                            width={1300}
                                                            height={677}
                                                            alt="Christmas Elf"
                                                            className="active w-full h-auto mb-2 rounded-md shadow-md">
                                                          </Image>
                                                        </DialogDescription>
                                                      </DialogHeader>
                                                    </DialogContent>
                                                  </Dialog>
                                                  <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3">24<br/><span className="text-xs">pcs</span></p>
                                                  <Image
                                                    src="/elf3.jpg"
                                                    width={1792}
                                                    height={2304}
                                                    alt="Christmas Elf"
                                                    className="active w-80 h-auto mb-2 rounded-tl-md rounded-tr-md">
                                                  </Image>
                                                  </div>
                                                  Christmas Elf
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
                                                  className="shadow-lg pb-2 transition-all cursor-pointer flex flex-col items-center justify-between rounded-md border border-stone-300 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-offset-8 hover:outline-8 hover:outline-stone-300/50 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-2  peer-data-[state=checked]:outline-green-400/80 peer-data-[state=checked]:outline-offset-0 peer-data-[state=checked]:shadow-lg"
                                                >
                                                  <div className="relative group">
                                                  <Dialog>
                                                    <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                                                    <Badge variant="outline">Examples</Badge>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                      <DialogHeader>
                                                        <DialogTitle>See it, believe it, achieve it!</DialogTitle>
                                                        <DialogDescription>
                                                          <Image
                                                            src="/insp.png"
                                                            width={1198}
                                                            height={1000}
                                                            alt="Ted Speaker"
                                                            className="active w-full h-auto mb-2 rounded-md shadow-md">
                                                          </Image>
                                                        </DialogDescription>
                                                      </DialogHeader>
                                                    </DialogContent>
                                                  </Dialog>
                                                  <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3 text-stone-400">24<br/><span className="text-xs">pcs</span></p>
                                                  <Image
                                                    src="/m1.jpg"
                                                    width={192}
                                                    height={2304}
                                                    alt="Ted Speaker"
                                                    className="active w-80 h-auto mb-2 rounded-tl-md rounded-tr-md">
                                                  </Image>
                                                  </div>
                                                  Peak You
                                                </Label>
                                              </div>               
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Step 3 - Subject Type */}
            {currentStep === 3 && (
              <div className="flex flex-col mx-auto text-center relative w-full mt-0 border-t border-b border-stone-300/50 pb-12">
                <Separator orientation="vertical" className="bg-stone-300 mx-auto h-12"/>
                <Badge className="mx-auto w-10 h-10 rounded-full p-4 text-center border-stone-300 mt-0 mb-0 ">3</Badge>
                <Separator orientation="vertical" className="bg-stone-300 mx-auto h-6"/>
                <FormDescription className="mt-6 pb-6 text-center text-3xl font-thin text-stone-700 tracking-tighter italic">
                  Select Your Subject
                </FormDescription>
                <RadioGroup
                  defaultValue={modelType}
                  className="grid md:grid-cols-12 gap-12 md:gap-18 mt-4 max-w-[1240px] mx-auto"
                  value={modelType}
                  onValueChange={(value) => {
                    form.setValue("type", value);
                  }}
                >
                  <div className="col-span-3">
                                  <RadioGroupItem
                                    value="man"
                                    id="man"
                                    className="peer sr-only"
                                    aria-label="man"
                                  />
                                  <Label
                                    htmlFor="man"
                                    className="w-32 h-32 peer-data-[state=checked]:scale-110 transition-all flex flex-col items-center justify-center rounded-full border border-stone-300 outline outline-8 outline-stone-300/50 outline-offset-4 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                                  >
                                    <Image 
                                      src="/man.png"
                                      width={56}
                                      height={56}
                                      alt="Man icon"
                                      className="mb-3"
                                    />
                                    Man
                                  </Label>
                                </div>
                  
                                <div className="col-span-3">
                                  <RadioGroupItem
                                    value="woman"
                                    id="woman"
                                    className="peer sr-only"
                                    aria-label="woman"
                                  />
                                  <Label
                                    htmlFor="woman"
                                    className="w-32 h-32 peer-data-[state=checked]:scale-110 transition-all flex flex-col items-center justify-center rounded-full border border-stone-300 outline outline-8 outline-stone-300/50 outline-offset-4 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                                  >
                                    <Image 
                                      src="/woman.png"
                                      width={56}
                                      height={56}
                                      alt="Man icon"
                                      className="mb-3"
                                    />
                                    Woman
                                  </Label>
                                </div>
                                <div className="col-span-3">
                                  <RadioGroupItem
                                    value="boy"
                                    id="boy"
                                    className="peer sr-only"
                                    aria-label="boy"
                                  />
                                  <Label
                                    htmlFor="boy"
                                    className="w-32 h-32 peer-data-[state=checked]:scale-110 transition-all flex flex-col items-center justify-center rounded-full border border-stone-300 outline outline-8 outline-stone-300/50 outline-offset-4 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                                  >
                                    <Image 
                                      src="/boy.png"
                                      width={56}
                                      height={56}
                                      alt="Man icon"
                                      className="mb-3"
                                    />
                                    Boy
                                  </Label>
                                </div>
                                <div className="col-span-3">
                                  <RadioGroupItem
                                    value="girl"
                                    id="girl"
                                    className="peer sr-only"
                                    aria-label="girl"
                                  />
                                  <Label
                                    htmlFor="girl"
                                    className="w-32 h-32 peer-data-[state=checked]:scale-110 transition-all flex flex-col items-center justify-center rounded-full border border-stone-300 outline outline-8 outline-stone-300/50 outline-offset-4 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                                  >
                                    <Image 
                                      src="/girl.png"
                                      width={56}
                                      height={56}
                                      alt="Man icon"
                                      className="mb-3"
                                    />
                                    Girl
                                  </Label>
                                </div>
                </RadioGroup>
              </div>
            )}

            {/* Step 4 - Upload Images */}
            {currentStep === 4 && (
              <>
                <div {...getRootProps()} className="relative justify-center align-middle cursor-pointer flex flex-col gap-4 mx-auto w-full p-6">
                  <FormDescription className="pb-4 text-center text-3xl font-thin text-stone-700 tracking-tighter italic">
                    Upload 6-10 pictures
                    <p className="text-sm tracking-normal font-normal max-w-[480px] mx-auto">in which your face is clearly visible and no other person is on it. <span className="font-bold">The key is variety:</span> different background, clothing, lighting in each photo. <span className="font-bold text-red-400">Don't use</span> filters and don't make grimaces in the pictures.</p>
                  </FormDescription>
                  <div className="max-w-[540px] mx-auto outline outline-8 outline-stone-400/10 hover:outline-stone-400/20 border border-stone-300 hover:border-green-400 w-full h-full rounded-3xl p-12 flex justify-center align-middle">
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
                  <div className="flex flex-row gap-4 flex-wrap mx-auto">
                    {files.map((file) => (
                      <div key={file.name} className="flex flex-col gap-1">
                        <img
                          src={URL.createObjectURL(file)}
                          className="rounded-md w-20 h-20 object-cover"
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
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              {currentStep > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className="rounded-full px-8"
                >
                  Previous
                </Button>
              )}
              
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="rounded-full px-8 bg-green-300/50 hover:bg-green-300"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="rounded-full transition-all px-8 bg-green-300/50 hover:bg-green-300 text-stone-800"
                  disabled={isLoading || !isStepValid()}
                >
                  {isLoading ? "Creating..." : `Create Photos ${stripeIsConfigured ? "(1 Credit)" : ""}`}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}











