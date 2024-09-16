import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import FormData from 'form-data';
import fetch from 'node-fetch';

export const dynamic = "force-dynamic";

const astriaApiKey = process.env.ASTRIA_API_KEY;
const astrTestModeIsOn = process.env.ASTRIA_TEST_MODE === "false";
const appWebhookSecret = process.env.APP_WEBHOOK_SECRET;
const stripeIsConfigured = process.env.NEXT_PUBLIC_STRIPE_IS_ENABLED === "true";

if (!appWebhookSecret) {
  throw new Error("MISSING APP_WEBHOOK_SECRET!");
}

export async function POST(request: Request) {
  const payload = await request.json();
  const images = payload.urls;
  const type = payload.type;
  const name = payload.name;

  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  if (!astriaApiKey) {
    return NextResponse.json(
      {
        message: "Missing API Key: Add your Astria API Key to generate headshots",
      },
      {
        status: 500,
      }
    );
  }

  if (images?.length < 4) {
    return NextResponse.json(
      {
        message: "Upload at least 4 sample images",
      },
      { status: 500 }
    );
  }
  let _credits = null;

  if (stripeIsConfigured) {
    const { error: creditError, data: credits } = await supabase
      .from("credits")
      .select("credits")
      .eq("user_id", user.id);

    if (creditError) {
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }

    if (credits.length === 0) {
      const { error: errorCreatingCredits } = await supabase
        .from("credits")
        .insert({
          user_id: user.id,
          credits: 0,
        });

      if (errorCreatingCredits) {
        return NextResponse.json(
          {
            message: "Something went wrong!",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          message: "Not enough credits, please purchase some credits and try again.",
        },
        { status: 500 }
      );
    } else if (credits[0]?.credits < 1) {
      return NextResponse.json(
        {
          message: "Not enough credits, please purchase some credits and try again.",
        },
        { status: 500 }
      );
    } else {
      _credits = credits;
    }
  }

  try {
    const trainWebhook = `https://${process.env.VERCEL_URL}/astria/train-webhook`;
    const trainWenhookWithParams = `${trainWebhook}?user_id=${user.id}&webhook_secret=${appWebhookSecret}`;

    const promptWebhook = `https://${process.env.VERCEL_URL}/astria/prompt-webhook`;
    const promptWebhookWithParams = `${promptWebhook}?user_id=${user.id}&webhook_secret=${appWebhookSecret}`;

    const API_KEY = astriaApiKey;
    const DOMAIN = "https://api.astria.ai";

    const body = {
      tune: {
        title: name,
        base_tune_id: 1504944,
        model_type: "lora",
        name: type,
        image_urls: images,
        callback: trainWenhookWithParams,
      },
    };

    const response = await axios.post(DOMAIN + "/tunes", body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const { status, statusText, data: tune } = response;

    if (status !== 201) {
      if (status === 400) {
        return NextResponse.json(
          {
            message: "webhookUrl must be a URL address",
          },
          { status }
        );
      }
      if (status === 402) {
        return NextResponse.json(
          {
            message: "Training models is only available on paid plans.",
          },
          { status }
        );
      }
    }

    const { error: modelError, data } = await supabase
      .from("models")
      .insert({
        modelId: tune.id,
        user_id: user.id,
        name,
        type,
      })
      .select("id")
      .single();

    if (modelError) {
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }

    const modelId = data?.id;

    const { error: samplesError } = await supabase.from("samples").insert(
      images.map((sample: string) => ({
        modelId: modelId,
        uri: sample,
      }))
    );

    if (samplesError) {
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }

    if (stripeIsConfigured && _credits && _credits.length > 0) {
      const subtractedCredits = _credits[0].credits - 1;
      const { error: updateCreditError, data } = await supabase
        .from("credits")
        .update({ credits: subtractedCredits })
        .eq("user_id", user.id)
        .select("*");

      if (updateCreditError) {
        return NextResponse.json(
          {
            message: "Something went wrong!",
          },
          { status: 500 }
        );
      }
    }

    // Construct the prompt text using the modelId
    const promptText = `<lora:${modelId}:1> a painting of ohwx man in the style of Van Gogh`;

    // Prepare the form data
    const form = new FormData();
    form.append('prompt[text]', promptText);
    form.append('prompt[callback]', promptWebhookWithParams);

    // Send the prompt to the Astria API
    const promptResponse = await fetch(`https://api.astria.ai/tunes/1504944/prompts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${astriaApiKey}`,
      },
      body: form,
    });

    const promptResult = await promptResponse.json();

    if (!promptResponse.ok) {
      return NextResponse.json(
        {
          message: 'Failed to generate image',
          error: promptResult,
        },
        { status: promptResponse.status }
      );
    }

    // Return the prompt result
    return NextResponse.json(
      {
        message: 'success',
        promptResult,
      },
      { status: 200 }
    );

  } catch (e) {
    let errorMessage = "Something went wrong!";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}