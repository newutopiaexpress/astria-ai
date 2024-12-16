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
import { FaFacebook } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const isIOSInAppBrowser = () => {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua);
  return isIOS && (ua.includes('FBAN') || ua.includes('FBAV') || ua.includes('Instagram'));
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
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMagicLinkSent, setIsMagicLinkSent] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<Inputs>();

  // Construct redirect URL
  const protocol = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' 
    ? 'https' 
    : host?.includes('localhost') ? 'http' : 'https';
  const redirectUrl = `${protocol}://${host}/auth/callback`;

  // Debug log
  useEffect(() => {
    console.log('Auth redirect URL:', redirectUrl);
  }, [redirectUrl]);

  const signInWithGoogle = async () => {
    try {
      setIsSubmitting(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;

    } catch (error) {
      console.error('Google auth error:', error);
      toast({
        title: "Authentication failed",
        description: "Could not sign in with Google",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setIsSubmitting(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: redirectUrl,
          scopes: 'email',
        },
      });

      if (error) throw error;

    } catch (error) {
      console.error('Facebook auth error:', error);
      toast({
        title: "Authentication failed",
        description: "Could not sign in with Facebook",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInWithMagicLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) throw error;

    } catch (error) {
      console.error('Magic link error:', error);
      throw error;
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      await signInWithMagicLink(data.email);
      setTimeout(() => {
        toast({
          title: "Email sent",
          description: "Check your inbox for a magic link to sign in.",
          duration: 5000,
        });
        setIsMagicLinkSent(true);
      }, 1000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: "Please try again later or contact support.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isMagicLinkSent) {
    return <WaitingForMagicLink toggleState={() => setIsMagicLinkSent(false)} />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center z-30">
      <div className="px-4 flex flex-col gap-4 bg-transparent w-full">
        <Button
          onClick={signInWithFacebook}
          disabled={isSubmitting}
          className="font-semibold p-8 rounded-full bg-[#1877F2] hover:bg-[#0C63D4] text-white"
        >
          <FaFacebook size={30} />
          <span className="pl-2">Continue with Facebook</span>
        </Button>

        {!isIOSInAppBrowser() && (
          <>
            <OR />
            <Button
              onClick={signInWithGoogle}
              disabled={isSubmitting}
              variant="googledark"
              className="font-semibold p-8 rounded-full"
            >
              <AiOutlineGoogle size={30} />
              <span className="pl-2">Continue with Google</span>
            </Button>
          </>
        )}

        <OR />

        <p className="italic text-center text-sm text-gray-500">
          continue with email
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-[210px]">
              <Input
                className="outline-0"
                type="email"
                placeholder="Email"
                disabled={isSubmitting}
                {...register("email", {
                  required: true,
                  validate: {
                    emailIsValid: (value: string) =>
                      /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ||
                      "Please enter a valid email",
                    emailDoesntHavePlus: (value: string) =>
                      !value.includes('+') ||
                      "Email addresses with a '+' are not allowed",
                    emailIsntDisposable: (value: string) =>
                      !disposableDomains.includes(value.split("@")[1]) ||
                      "Please use a permanent email address",
                  },
                })}
              />
              {isSubmitted && errors.email && (
                <span className="text-xs text-red-400">
                  {errors.email?.message || "Email is required"}
                </span>
              )}
            </div>
          </div>

          <Button
            variant="default"
            className="w-auto p-6 rounded-full font-semibold text-md"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export const OR = () => (
  <div className="flex items-center my-1">
    <div className="border-b flex-grow mr-2 opacity-50" />
    <span className="text-xs opacity-50">OR</span>
    <div className="border-b flex-grow ml-2 opacity-50" />
  </div>
);