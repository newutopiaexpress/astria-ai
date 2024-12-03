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
    <div className="grid grid-cols-12 w-full rounded-3xl relative">

      <div className="col-span-12 md:col-span-12 bg-stone-100/0 z-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md flex flex-col"
        >

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div>
              <FormItem className="relative w-full p-6 mx-auto pb-12">
                <FormDescription className="z-10 p-6 text-center text-2xl font-thin text-stone-700 tracking-tight">
                   <Badge className="w-10 h-10 rounded-full p-4 text-center bg-stone-200 border-stone-300">1</Badge> <br/>
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

        <Separator orientation="vertical" className="bg-stone-300 mx-auto h-12"/>
        <Badge className="mx-auto w-10 h-10 rounded-full p-4 text-center bg-stone-200 border-stone-300 mt-0 mb-0">2</Badge>
        <Separator orientation="vertical" className="bg-stone-300 mx-auto h-10"/>

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
                  <div className="mx-auto pt-4">

                      <Tabs defaultValue="christmas" className="min-w-full mx-auto">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="christmas">Christmas</TabsTrigger>
                          <TabsTrigger value="corporate">Corporate</TabsTrigger>
                          <TabsTrigger value="speaker">Speaker</TabsTrigger>
                        </TabsList>
                          <TabsContent value="christmas">
                            <div className="space-y-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                              <div>
                                <RadioGroupItem
                                  value="corporate-portraits"
                                  id="corporate-portraits"
                                  className="peer sr-only"
                                  aria-label="corporate-portraits"
                                />
                                <Label
                                  htmlFor="corporate-portraits"
                                  className="shadow-lg pb-2 transition-all cursor-pointer flex flex-col items-center justify-between rounded-md border border-stone-300 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 outline  outline-0 outline-stone-300 hover:outline hover:outline-offset-8 hover:outline-8 hover:outline-stone-300/50 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-2  peer-data-[state=checked]:outline-green-400/80 peer-data-[state=checked]:outline-offset-0 peer-data-[state=checked]:shadow-lg"
                                >

                                  <div className="relative group">
                                  <Dialog>
                                    <DialogTrigger className="absolute top-2 left-2 text-stone-300 invisible group-hover:visible">
                                    <Badge variant="outline">Examples</Badge>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Corporate Portraits</DialogTitle>
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
                            </div>
                          </TabsContent>
                          <TabsContent value="corporate">
                            <div className="space-y-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
                                    <Badge variant="outline">Examples</Badge>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Corporate Portraits</DialogTitle>
                                        <DialogDescription>
                                          <Image
                                            src="/model-corp.png"
                                            width={1198}
                                            height={1000}
                                            alt="Corporate Headshots"
                                            className="active w-full h-auto mb-2 rounded-md shadow-md">
                                          </Image>
                                        </DialogDescription>
                                      </DialogHeader>
                                    </DialogContent>
                                  </Dialog>
                                  <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3 text-stone-400">24<br/><span className="text-xs">pcs</span></p>
                                  <Image
                                    src="/corph.jpg"
                                    width={896}
                                    height={1152}
                                    alt="Corporate Headshots"
                                    className="active w-80 h-auto mb-2 rounded-tl-md rounded-tr-md">
                                  </Image>
                                  </div>

                                  Corporate Headshots
                                </Label>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="speaker">
                            <div className="space-y-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
                                    <Badge variant="outline">Examples</Badge>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Corporate Portraits</DialogTitle>
                                        <DialogDescription>
                                          <Image
                                            src="/model-corp.png"
                                            width={1198}
                                            height={1000}
                                            alt="Corporate Headshots"
                                            className="active w-full h-auto mb-2 rounded-md shadow-md">
                                          </Image>
                                        </DialogDescription>
                                      </DialogHeader>
                                    </DialogContent>
                                  </Dialog>
                                  <p className="transition-all text-xl text-center absolute top-4 right-4 invisible group-hover:visible leading-3 text-stone-400">24<br/><span className="text-xs">pcs</span></p>
                                  <Image
                                    src="/corph.jpg"
                                    width={896}
                                    height={1152}
                                    alt="Corporate Headshots"
                                    className="active w-80 h-auto mb-2 rounded-tl-md rounded-tr-md">
                                  </Image>
                                  </div>

                                  Corporate Headshots
                                </Label>
                              </div>
                            </div>
                          </TabsContent>
                      </Tabs>        
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


          <div className="flex flex-col   mx-auto text-center relative w-full mt-0 border-t border-b border-stone-300/50 pb-12">

            <Separator orientation="vertical" className="bg-stone-300 mx-auto h-12"/>
            <Badge className="mx-auto w-10 h-10 rounded-full p-4 text-center border-stone-300 mt-0 mb-0 ">3</Badge>
            <Separator orientation="vertical" className="bg-stone-300 mx-auto h-6"/>


            <FormDescription className="mt-6 pb-6 text-center text-3xl font-thin text-stone-700 tracking-tighter italic">
              Select Your Subject
            </FormDescription>
            <RadioGroup
              defaultValue={modelType}
              className="grid md:grid-cols-6 gap-12 md:gap-18 mt-4 max-w-[1240px] mx-auto"
              value={modelType}
              onValueChange={(value) => {
                form.setValue("type", value);
              }}
            >
              <div className="">
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

              <div className="w-32">
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
              <div className="w-32">
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
              <div className="w-32">
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
              <div className="w-32">
                <RadioGroupItem
                  value="cat"
                  id="cat"
                  className="peer sr-only"
                  aria-label="cat"
                />
                <Label
                  htmlFor="cat"
                  className="w-32 h-32 peer-data-[state=checked]:scale-110 transition-all flex flex-col items-center justify-center rounded-full border border-stone-300 outline outline-8 outline-stone-300/50 outline-offset-4 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                >
                  <Image 
                    src="/cat.png"
                    width={56}
                    height={56}
                    alt="Man icon"
                    className="mb-3"
                  />
                  Cat
                </Label>
              </div>
              <div className="w-32">
                <RadioGroupItem
                  value="dog"
                  id="dog"
                  className="peer sr-only"
                  aria-label="dog"
                />
                <Label
                  htmlFor="dog"
                  className="w-32 h-32 peer-data-[state=checked]:scale-110 transition-all flex flex-col items-center justify-center rounded-full border border-stone-300 outline outline-8 outline-stone-300/50 outline-offset-4 bg-transparent hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-2 peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                >
                  <Image 
                    src="/dog.png"
                    width={56}
                    height={56}
                    alt="Man icon"
                    className="mb-3"
                  />
                  Dog
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator orientation="vertical" className="bg-stone-300 mx-auto h-12"/>
          <Badge className="mx-auto w-10 h-10 rounded-full p-4 text-center border-stone-300 mt-0 mb-0 ">4</Badge>
          <Separator orientation="vertical" className="bg-stone-300 mx-auto h-6"/>
          <div
            {...getRootProps()}
            className="relative justify-center align-middle cursor-pointer flex flex-col gap-4 mx-auto w-full p-6"
          >
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
          <Separator orientation="vertical" className="bg-stone-300 mx-auto h-12"/>
          <Button 
  type="submit" 
  className="rounded-full transition-all w-fit p-12 mx-auto bg-green-300/50 hover:bg-green-300 text-stone-800 hover:text-stone-800 text-lg mb-16 mt-6 outline outline-8 outline-offset-4 outline-stone-300/50 hover:outline hover:outline-2 hover:outline-offset-1 hover:outline-green-400"
  disabled={isLoading}
>
  {isLoading ? (
    <>
      
      Creating...
    </>
  ) : (
    <>
      Create Photos{" "}
      {stripeIsConfigured && <span className="ml-1">(1 Credit)</span>}
      <SparkleIcon/>
    </>
  )}
</Button>
        </form>
      </Form>
      </div>

      

    </div>
  );
}


export function SparkleIcon() {
  return (
<svg className="animate-pulse w-6 h-6 ml-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>
)
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

export function ArrowIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="mx-auto w-10 h-10 text-stone-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
</svg>

  )
}








