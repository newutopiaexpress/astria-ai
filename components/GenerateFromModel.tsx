"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

interface GenerateFromModelProps {
  modelId: string;
}

export default function GenerateFromModel({ modelId }: GenerateFromModelProps) {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState<any>(null);
  const { toast } = useToast();
  const strength = "0.8";

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  useEffect(() => {
    const fetchModel = async () => {
      const { data, error } = await supabase
        .from('models')
        .select('*')
        .eq('id', modelId)
        .single();

      if (!error && data) {
        setCurrentModel(data);
      }
    };

    fetchModel();
  }, [modelId]);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const formattedPrompt = `<lora:${currentModel?.tune_id}:${strength}> ${prompt}`;

      const response = await fetch("/api/astria/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          modelId: currentModel?.tune_id,
          prompt: formattedPrompt
        })
      });
      
      if (!response.ok) throw new Error("Generation failed");
      
      const data = await response.json();
      toast({
        title: "Generation started",
        description: "You'll be notified when your images are ready",
        duration: 5000,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unknown error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {currentModel && (
        <div className="text-sm mb-2">
          Model ID: {currentModel.tune_id}
        </div>
      )}
      <div className="relative max-w-xl">
        <Input 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="describe your image here..."
          disabled={isLoading}
          className="pl-32"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-gray-500">
          {`<lora:${currentModel?.tune_id || modelId}:${strength}>`}
        </div>
      </div>

      <Button 
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
        className="w-fit"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          'Generate Images'
        )}
      </Button>
    </div>
  );
}