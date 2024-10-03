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
   
      <div className="bg-stone-100 text-stone-800 mt-6 rounded-3xl border border-stone-300 outline outline-stone-200/50 outline-8 outline-offset-4 p-6 md:p-12 mb-12 md:">
        <h1 className="font-bold italic mb-12 text-xl"><WarningIcon /> How to get the best results?</h1>
        <div className="grid md:grid-cols-3 gap-12 lg:gap-32 mx-auto text-center">
            <div>
              <Image src="/01.png" width={240} height={240} alt="face" className="w-32 mx-auto h-auto mb-2 rounded-md shadow-md"></Image>
              <p className="text-sm">Use <span className="text-green-400 font-bold">6-12 photos</span> that clearly show your face, and no other people on it. Upload a few that show your upper body too.</p>
            </div>
            <div>
              <Image src="/02.png" width={240} height={240} alt="face" className="w-32 mx-auto h-auto mb-2 rounded-md shadow-md"></Image>
              <p className="text-sm"><span className="text-green-400 font-bold">Variety is the key:</span> Use different time of day, background, lighting, clothing. </p>
            </div>
            <div>
              <Image src="/03.png" width={240} height={240} alt="face" className="w-32 mx-auto h-auto mb-2 rounded-md shadow-md"></Image>
              <p className="text-sm">Don't use a photo that you think is <span className="text-red-400 font-bold">unattractive, grimacing, or blurry.</span> Do not use beauty <span className="text-red-400 font-bold">filters!</span></p>
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
              <FormItem className="relative w-full mx-auto text-center border border-stone-300/50 rounded-3xl pt-12 pb-12">
                <div className="absolute top-6 left-6 font-thin text-stone-300 text-3xl">1</div>
                <FormDescription className="p-6 text-center text-3xl font-thin text-stone-700 tracking-tighter italic">
                  Give your model a name:
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="e.g. Natalie Headshots"
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
            <FormItem className="relative w-full mx-auto mt-4 border border-stone-300/50 rounded-3xl pt-12 pb-12">
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
                  <div className="grid md:grid-cols-5 gap-4 mt-6 mb-6 px-6">

                    <div>
                      <RadioGroupItem
                        value="corporate-headshots"
                        id="corporate-headshots"
                        className="peer sr-only"
                        aria-label="corporate-headshots"
                      />
                      <Label
                        htmlFor="corporate-headshots"
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >

                        <div>
                        <Image
                          src="/corporate.jpg"
                          width={896}
                          height={1152}
                          alt="Corporate Portraits"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>
                        </div>

                        Corporate Photos
                      </Label>
                    </div>
{/*
                    <div>
                      <RadioGroupItem
                        value="aristocratic-portraits"
                        id="aristocratic-portraits"
                        className="peer sr-only"
                        aria-label="aristocratic-portraits"
                      />
                      <Label
                        htmlFor="aristocratic-portraits"
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >

                        <Image
                          src="/aristocratic.jpg"
                          width={896}
                          height={1152}
                          alt="Aristocratic Portraits"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>

                        Aristocratic Portraits
                      </Label>
                    </div>
*/}
                    
                    <div>
                      <RadioGroupItem
                        value="youtube-thumbnail-reaction"
                        id="youtube-thumbnail-reaction"
                        className="peer sr-only"
                        aria-label="youtube-thumbnail-reaction"
                      />
                      <Label
                        htmlFor="youtube-thumbnail-reaction"
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <Image
                          src="/youtube.jpg"
                          width={896}
                          height={1152}
                          alt="Youtube Thumbnails"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>

                        Youtube Thumbnails
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="speaker"
                        id="speaker"
                        className="peer sr-only"
                        aria-label="ted-speaker"
                      />
                      <Label
                        htmlFor="speaker"
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <Image
                          src="/ted.jpg"
                          width={896}
                          height={1152}
                          alt="Ted Speaker"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>

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
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >

                        <Image
                          src="/glamour.jpg"
                          width={896}
                          height={1152}
                          alt="Aristocratic Portraits"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>

                        Glamour Shot
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="generative-artistic-filters"
                        id="generative-artistic-filters"
                        className="peer sr-only"
                        aria-label="generative-artistic-filters"
                      />
                      <Label
                        htmlFor="generative-artistic-filters"
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <Image
                          src="/photographer.jpg"
                          width={896}
                          height={1152}
                          alt="Aristocratic Portraits"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>

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
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <Image
                          src="/bold.jpg"
                          width={896}
                          height={1152}
                          alt="Aristocratic Portraits"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>

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
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <Image
                          src="/dating.jpg"
                          width={896}
                          height={1152}
                          alt="dating"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>

                        Dating
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="j-crew"
                        id="j-crew"
                        className="peer sr-only"
                        aria-label="j-crew"
                      />
                      <Label
                        htmlFor="j-crew"
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <Image
                          src="/jcrew.jpg"
                          width={896}
                          height={1152}
                          alt="j-crew"
                          className="active w-80 h-auto mb-2 rounded-md shadow-md">
                        </Image>

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
<svg className="w-8 h-8 text-stone-300 float-left mr-2" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
  )
}


