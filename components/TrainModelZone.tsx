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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      const newFiles: File[] =
        acceptedFiles.filter(
          (file: File) => !files.some((f) => f.name === file.name)
        ) || [];

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

      // display a toast if any duplicate files were found
      if (newFiles.length !== acceptedFiles.length) {
        toast({
          title: "Duplicate file names",
          description:
            "Some of the files you selected were already added. They were ignored.",
          duration: 5000,
        });
      }

      // check that in total images do not exceed a combined 4.5MB
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      const newSize = newFiles.reduce((acc, file) => acc + file.size, 0);

      if (totalSize + newSize > 4.5 * 1024 * 1024) {
        toast({
          title: "Images exceed size limit",
          description:
            "The total combined size of the images cannot exceed 4.5MB.",
          duration: 5000,
        });
        return;
      }

      setFiles([...files, ...newFiles]);

      toast({
        title: "Images selected",
        description: "The images were successfully selected.",
        duration: 5000,
      });
    },
    [files]
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

                              <Dialog>
                                <DialogTrigger className="underline underline-offset-1 italic">How to get the best results?</DialogTrigger>
                                <DialogContent className="p-16">
                                    <DialogHeader>
                                    <DialogTitle className="font-thin text-3xl mb-6">How to get the best results?</DialogTitle>
                                    <DialogDescription>
                                      
                                        <ul className="list-disc leading-8">
                                        <li>Upload both portrait and full body shots</li>
                                        <li>Use 4-12 pictures of your subject. </li>
                                        <li>Variation is key - Change body pose for every picture, use pictures from different days backgrounds and lighting.</li>
                                        <li>Avoid pictures taken at the same hour/day. For example few pictures with the same shirt will make the model learn the shirt as well as part of the subject.</li>
                                        <li>Always pick a new background.</li>
                                        <li>Do not upload pictures mixed with other people</li>
                                        <li>Do not upload upload funny faces</li>
                                        </ul>
                                    </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                              </Dialog>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-md flex flex-col gap-8"
        >

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full mx-auto text-center">
                <FormDescription className="pb-6 text-center text-sm">
                  Give your model a name
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="e.g. Natalie Headshots"
                    {...field}
                    className="max-w-screen-sm mx-auto"
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
            <FormItem className="w-full mx-auto mt-9">
              <FormDescription className="text-center text-sm">
                Select the style of the image you want to generate.
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
                  <div className="grid md:grid-cols-6 gap-4 mt-6 mb-6">

                    <div>
                      <RadioGroupItem
                        value="corporate-portraits"
                        id="corporate-portraits"
                        className="peer sr-only"
                        aria-label="corporate-portraits"
                      />
                      <Label
                        htmlFor="corporate-portraits"
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >

                        <div>
                        <Image
                          src="/corporate.jpg"
                          width={896}
                          height={1152}
                          alt="corporate Portraits"
                          className="active w-80 h-auto mb-2">
                        </Image>
                        </div>

                        Corporate Headshots
                      </Label>
                    </div>

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
                          className="active w-80 h-auto mb-2">
                        </Image>

                        Aristocratic Portraits
                      </Label>
                    </div>
                    
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
                          alt="Aristocratic Portraits"
                          className="active w-80 h-auto mb-2">
                        </Image>

                        Youtube Thumbnail Reaction
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="glamour-shot"
                        id="glamour-shot"
                        className="peer sr-only"
                        aria-label="glamour-shot"
                        disabled
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
                          className="active w-80 h-auto mb-2">
                        </Image>

                        Glamour Shot
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="ai-photographer"
                        id="ai-photographer"
                        className="peer sr-only"
                        aria-label="ai-photographer"
                        disabled
                      />
                      <Label
                        htmlFor="ai-photographer"
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <Image
                          src="/photographer.jpg"
                          width={896}
                          height={1152}
                          alt="Aristocratic Portraits"
                          className="active w-80 h-auto mb-2">
                        </Image>

                        Ai Photographer
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="bold-colors"
                        id="bold-colors"
                        className="peer sr-only"
                        aria-label="bold-colors"
                        disabled
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
                          className="active w-80 h-auto mb-2">
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
                        disabled
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
                          className="active w-80 h-auto mb-2">
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
                        disabled
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
                          className="active w-80 h-auto mb-2">
                        </Image>

                        J-crew
                      </Label>
                    </div>
                  
                    <div>
                      <RadioGroupItem
                        value="generative-artistic-filters"
                        id="generative-artistic-filters"
                        className="peer sr-only"
                        aria-label="generative-artistic-filters"
                        disabled
                      />
                      <Label
                        htmlFor="generative-artistic-filters"
                        className="cursor-pointer	flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-400 [&:has([data-state=checked])]:border-stone-400 hover:outline hover:outline-8 hover:outline-stone-400/20 peer-data-[state=checked]:outline peer-data-[state=checked]:outline-8 peer-data-[state=checked]:outline-stone-400/10 peer-data-[state=checked]:outline-offset-1 peer-data-[state=checked]:shadow-lg"
                      >
                        <Image
                          src="/artistic.jpg"
                          width={896}
                          height={1152}
                          alt="generative-artistic-filters"
                          className="active w-80 h-auto mb-2">
                        </Image>

                        Generative Artistic Filters
                      </Label>
                    </div>
                    
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


          <div className="flex flex-col gap-4 max-w-96 mx-auto text-center">
            <FormDescription className="pb-6 text-center text-sm">
              Select a Style
            </FormDescription>
            <RadioGroup
              defaultValue={modelType}
              className="grid grid-cols-3 gap-12"
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
            className="justify-center align-middle cursor-pointer flex flex-col gap-4 mx-auto w-full"
          >
            <FormDescription className="mt-16 pb-4 text-center text-sm">
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