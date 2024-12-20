import { Database } from "./supabase";

export type modelRow = Database["public"]["Tables"]["models"]["Row"];
export type sampleRow = Database["public"]["Tables"]["samples"]["Row"];

export type modelRowWithSamples = modelRow & {
  samples: sampleRow[];
};

export type imageRow = {
  created_at: string;
  id: number;
  modelId: number;
  uri: string;
  share_id: string;
  is_public: boolean;
};

export type creditsRow = Database["public"]["Tables"]["credits"]["Row"];
