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
import TrainModelZonePacks from "@/components/TrainModelZonePacks";


type FormInput = z.infer<typeof fileUploadFormSchema>;

interface Pack {
  id: string;
  title: string;
  slug: string;
}

const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === "true";

const steps = [
  { number: 1, title: "Name It" },
  { number: 2, title: "Choose Style" },
  { number: 3, title: "Select Subject" },
  { number: 4, title: "Upload Photos" },
];

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

  const onDrop: any = useCallback(
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
        {/* Step Indicator */}
        <div className="hidden w-full md:max-w-xl mx-auto mb-12">
          <div className="relative flex justify-between">
            {/* Connecting Line */}
            <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-stone-200 from-1% via-stone-300 via-50% to-stone-200 to-99% -translate-y-1/3" />
            
            {/* Steps */}
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center bg-stone-200 z-10
                    ${currentStep === step.number
                      ? "border-green-400  text-green-600"
                      : currentStep > step.number
                      ? "border-green-400  text-green-500"
                      : "border-stone-300 text-stone-500"
                    }`}
                >
                  {currentStep > step.number ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="text-xs">{step.number}</span>
                  )}
                </div>
                <span 
                  className={`mt-2 text-xs whitespace-nowrap
                    ${currentStep === step.number 
                      ? "text-stone-700 font-normal" 
                      : "text-stone-500 font-thin"}`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

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
                    <FormItem className="relative w-full mx-auto pb-12">
                      <FormDescription className="z-10 pb-6 pt-12 md:pt-24 text-center text-2xl font-thin text-stone-700 tracking-tight">
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
                    <FormDescription className="pt-12 md:pt-24 text-center text-2xl font-thin text-stone-700 tracking-tight">
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
                        <TrainModelZonePacks/>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Step 3 - Subject Type */}
            {currentStep === 3 && (
              <div className="flex flex-col mx-auto text-center relative w-full pb-12">
                <FormDescription className="pb-6 text-center text-2xl font-thin text-stone-700 tracking-tight">
                  Select Your Subject
                </FormDescription>
                <RadioGroup
                  defaultValue={modelType}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto px-4"
                  value={modelType}
                  onValueChange={(value) => {
                    form.setValue("type", value);
                  }}
                >
                  {[
                    { value: "man", label: "Man", icon: "👨" },
                    { value: "woman", label: "Woman", icon: "👩" },
                    { value: "boy", label: "Boy", icon: "👦" },
                    { value: "girl", label: "Girl", icon: "👧" }
                  ].map((item) => (
                    <div key={item.value} className="relative">
                      <RadioGroupItem
                        value={item.value}
                        id={item.value}
                        className="peer sr-only"
                        aria-label={item.value}
                      />
                      <Label
                        htmlFor={item.value}
                        className="flex flex-col items-center justify-center h-32 w-32 rounded-2xl border-2 border-stone-200 
                          bg-white transition-all cursor-pointer
                          hover:border-green-400/50 hover:bg-green-50/50
                          peer-data-[state=checked]:border-green-400 
                          peer-data-[state=checked]:bg-green-50/50
                          peer-data-[state=checked]:scale-[1.02]
                          peer-data-[state=checked]:shadow-sm"
                      >
                        <span className="text-3xl mb-2 saturate-0 hover:saturate-100">{item.icon}</span>
                        <span className="text-sm font-medium text-stone-600">
                          {item.label}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 4 - Upload Images */}
            {currentStep === 4 && (
              <>
                <div {...getRootProps()} className="relative justify-center align-middle cursor-pointer flex flex-col gap-4 mx-auto w-full">
                  <FormDescription className="px-6 pb-6 text-center text-2xl font-thin text-stone-700 tracking-tight">
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
                  <div className="flex flex-row gap-4 flex-wrap mx-auto mt-12 md:mb-6">
                    {files.map((file) => (
                      <div key={file.name} className="flex flex-col gap-1 mx-auto">
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
                  className="rounded-full px-8 py-6 border-stone-400 text-stone-600 hover:bg-stone-100"
                >
                  Previous
                </Button>
              )}
              
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="rounded-full px-8 py-6 bg-green-600 hover:bg-green-700 text-white shadow-sm"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="rounded-full transition-all px-8 py-6 bg-green-600 hover:bg-green-700 text-white shadow-sm"
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











