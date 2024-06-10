import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const astriaApiKey = process.env.ASTRIA_API_KEY;
const astriaTestModeIsOn = process.env.ASTRIA_TEST_MODE === "true";
// For local development, recommend using an Ngrok tunnel for the domain

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
        message:
          "Missing API Key: Add your Astria API Key to generate headshots",
      },
      {
        status: 500,
      }
    );
  }

  if (images?.length < 1) {
    return NextResponse.json(
      {
        message: "Upload at least 4 sample images",
      },
      { status: 500 }
    );
  }
  let _credits = null;

  console.log({ stripeIsConfigured });
  if (stripeIsConfigured) {
    const { error: creditError, data: credits } = await supabase
      .from("credits")
      .select("credits")
      .eq("user_id", user.id);

    if (creditError) {
      console.error({ creditError });
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }

    if (credits.length === 0) {
      // create credits for user.
      const { error: errorCreatingCredits } = await supabase
        .from("credits")
        .insert({
          user_id: user.id,
          credits: 0,
        });

      if (errorCreatingCredits) {
        console.error({ errorCreatingCredits });
        return NextResponse.json(
          {
            message: "Something went wrong!",
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          message:
            "Not enough credits, please purchase some credits and try again.",
        },
        { status: 500 }
      );
    } else if (credits[0]?.credits < 1) {
      return NextResponse.json(
        {
          message:
            "Not enough credits, please purchase some credits and try again.",
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
        // Hard coded tune id of Realistic Vision v5.1 from the gallery - https://www.astria.ai/gallery/tunes
        // https://www.astria.ai/gallery/tunes/690204/prompts
        base_tune_id: 690204,
        name: type,
        branch: "fast",
        token: "ohwx",
        image_urls: images,
        input_image: images,
        callback: trainWenhookWithParams,
        prompts_attributes: [
          {
            text: `Editorial portrait of {{ohwx man}} detailed face, dark background, dramatic lighting, suggestive, friendly look, dark, warm, cozy athmosphere, professional, picturesque, masterpiece photography`,
            negative_prompt:`bad anatomy, red eyes, ugly, old, sad`,
            callback: promptWebhookWithParams,
            num_images: 1,
            //super_resolution: true,
            //inpaint_faces: false,
            //hires_fix: true,
            //face_correct: false,
          },
          {
            text: `RAW photo, portrait photo of (ohwx man), playing a guitar, model photoshoot, professional photo, white background, Amazing Details, Best Quality, Masterpiece`,
            negative_prompt:`bad anatomy, red eyes, ugly, old, sad`,
            callback: promptWebhookWithParams,
            num_images: 1,
          },
          {
            text: `editorial portrait of {{ohwx man}}, detailed face, dark background, dramatic lighting, suggestive, friendly look, dark, warm, cozy athmosphere, professional, picturesque, masterpiece photography`,
            negative_prompt:`bad anatomy, red eyes, ugly, old, sad`,
            callback: promptWebhookWithParams,
            num_images: 1,
          },
          {
            text: `half body editorial portrait of {{ohwx man}}, detailed face, dark background, dramatic lighting, suggestive, friendly look, dark, warm, cozy athmosphere, professional, picturesque, masterpiece, half body portrait`,
            negative_prompt:`bad anatomy, red eyes, ugly, old, sad`,
            callback: promptWebhookWithParams,
            num_images: 1,
          },
          {
            text: `candid portrait photo of {{ohwx man}}, detailed face, night city background, dramatic lighting, suggestive, friendly look, dark, warm, cozy athmosphere, professional, picturesque, masterpiece`,
            negative_prompt:`bad anatomy, red eyes, ugly, old, sad`,
            callback: promptWebhookWithParams,
            num_images: 1,
          },
          {
            text: `Glamour Portrait of {{ohwx man}},  detailed face, dark background, dramatic lighting, suggestive but friendly look, dark, warm, cozy athmosphere, professional photo, picturesque, masterpiece, half body portrait`,
            negative_prompt:`bad anatomy, red eyes, ugly, old, sad`,
            callback: promptWebhookWithParams,
            num_images: 1,
          },
          {
            text: `portrait of (ohwx man) wearing a business suit, model photoshoot, professional photo, white background, Amazing Details, Best Quality, Masterpiece, dramatic lighting highly detailed, analog photo, overglaze, 80mm Sigma f/1.4 or any ZEISS lens`,
            negative_prompt:`bad anatomy, red eyes, ugly, old, sad`,
            callback: promptWebhookWithParams,
            num_images: 1,
          },
          {
            text: `analog style modelshoot style medium portrait of (ohwx man) wearing hoodie and pants in luxury villa living room, masterpiece, cinematic light, ultrarealistic+, photorealistic+, 8k, raw photo, realistic, sharp focus on eyes, (symmetrical eyes), (intact eyes), hyperrealistic, highest quality, best quality,highly detailed, masterpiece, best quality, extremely detailed cg unity 8k wallpaper, masterpiece, best quality, ultra-detailed, best shadow, detailed background, beautiful detailed face, beautiful detailed eyes, high contrast, best illumination, detailed face, beautiful, dulux, caustic, dynamic angle, beautiful detailed glow. dramatic lighting. highly detailed, insanely detailed hair, symmetrical, intricate details, professionally retouched, elegant, 8k high definition. strong bokeh. award winning photo`,
            negative_prompt:`elongated body (deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime), text, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers,`,
            callback: promptWebhookWithParams,
            num_images: 1,
          },
          {
            text: `analog style modelshoot style medium portrait of (ohwx man) wearing hoodie and pants in luxury villa living room, masterpiece, cinematic light, ultrarealistic+, photorealistic+, 8k, raw photo, realistic, sharp focus on eyes, (symmetrical eyes), (intact eyes), hyperrealistic, highest quality, best quality,highly detailed, masterpiece, best quality, extremely detailed cg unity 8k wallpaper, masterpiece, best quality, ultra-detailed, best shadow, detailed background, beautiful detailed face, beautiful detailed eyes, high contrast, best illumination, detailed face, beautiful, dulux, caustic, dynamic angle, beautiful detailed glow. dramatic lighting. highly detailed, insanely detailed hair, symmetrical, intricate details, professionally retouched, elegant, 8k high definition. strong bokeh. award winning photo`,
            negative_prompt:`elongated body (deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime), text, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers,`,
            callback: promptWebhookWithParams,
            num_images: 1,
          },
        ],
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
      console.error({ status });
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
        modelId: tune.id, // store tune Id field to retrieve workflow object if needed later
        user_id: user.id,
        name,
        type,
      })
      .select("id")
      .single();

    if (modelError) {
      console.error("modelError: ", modelError);
      return NextResponse.json(
        {
          message: "Something went wrong!",
        },
        { status: 500 }
      );
    }

    // Get the modelId from the created model
    const modelId = data?.id;

    const { error: samplesError } = await supabase.from("samples").insert(
      images.map((sample: string) => ({
        modelId: modelId,
        uri: sample,
      }))
    );

    if (samplesError) {
      console.error("samplesError: ", samplesError);
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

      console.log({ data });
      console.log({ subtractedCredits });

      if (updateCreditError) {
        console.error({ updateCreditError });
        return NextResponse.json(
          {
            message: "Something went wrong!",
          },
          { status: 500 }
        );
      }
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "success",
    },
    { status: 200 }
  );
}
