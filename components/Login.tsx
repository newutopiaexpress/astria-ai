"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import disposableDomains from "disposable-email-domains";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";
import { WaitingForMagicLink } from "./WaitingForMagicLink";

// iOS in-app browser detection
const isIOSInAppBrowser = () => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  return isIOS && (
    ua.includes('FBAN') || 
    ua.includes('FBAV') || 
    ua.includes('Instagram')
  );
};

type Inputs = {
  email: string;
};

export const Login = ({
  host,
  searchParams,
}: {
  host: string | null;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const supabase = createClientComponentClient<Database>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      await signInWithMagicLink(data.email);
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Email sent",
          description: "Check your inbox for a magic link to sign in.",
          duration: 5000,
        });
        setIsMagicLinkSent(true);
      }, 1000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: "Please try again, if the problem persists, contact us at tamas@utopia.express",
        duration: 5000,
      });
    }
  };

  let inviteToken = null;
  if (searchParams && "inviteToken" in searchParams) {
    inviteToken = searchParams["inviteToken"];
  }

  const protocol = host?.includes("localhost") ? "http" : "https";
  const redirectUrl = `${protocol}://${host}/auth/callback`;

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
      },
    });
  };

  const signInWithMagicLink = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  if (isMagicLinkSent) {
    return <WaitingForMagicLink toggleState={() => setIsMagicLinkSent(false)} />;
  }

  return (
    <>
      <div className="flex h-full w-full items-center justify-center py-32 z-30">
        <div className="flex flex-col gap-4 bg-transparent max-w-[460px]">
          
          {isIOSInAppBrowser() ? (
            <div className="max-w-[400px] max-auto px-4 text-xs text-center p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 mb-4">
              Social login is disabled in this browser. Please use email login or open in Safari.
            </div>
          ) : (
            <Button
              onClick={signInWithGoogle}
              variant="googledark"
              className="font-semibold p-8 rounded-full"
            >
              <AiOutlineGoogle size={30} />
              <span className="pl-2">Continue with Google</span>
            </Button>
          )}

          <p className="italic text-center text-sm text-gray-500 pt-6">
            or continue with email
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-2">
            <div className="mx-auto flex flex-col gap-4">
              <div className="mx-auto flex flex-col gap-2">
                <Input
                  className="outline-0"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    validate: {
                      emailIsValid: (value: string) =>
                        /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                        "Please enter a valid email",
                      emailDoesntHavePlus: (value: string) =>
                        /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                        "Email addresses with a '+' are not allowed",
                      emailIsntDisposable: (value: string) =>
                        !disposableDomains.includes(value.split("@")[1]) ||
                        "Please use a permanent email address",
                    },
                  })}
                />
                {isSubmitted && errors.email && (
                  <span className="text-xs text-red-400">
                    {errors.email?.message || "Email is required to sign in"}
                  </span>
                )}
              </div>
            </div>

            <Button
              variant="default"
              className="w-auto p-6 rounded-full font-semibold text-md"
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export const OR = () => {
  return (
    <div className="flex items-center my-1">
      <div className="border-b flex-grow mr-2 opacity-50" />
      <span className="text-sm opacity-50">OR</span>
      <div className="border-b flex-grow ml-2 opacity-50" />
    </div>
  );
};