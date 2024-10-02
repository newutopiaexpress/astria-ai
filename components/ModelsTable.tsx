
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { Database } from "@/types/supabase";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { modelRowWithSamples } from "@/types/utils";

type ModelsTableProps = {
  models: modelRowWithSamples[];
};

export default async function ModelsTable({ models }: ModelsTableProps) {
  const router = useRouter();
  const handleRedirect = (id: number) => {
    router.push(`/overview/models/${id}`);
  };

  return (
    <div className="rounded-sm border-none shadow-none bg-transparent md:p-9">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="text-xs opacity-40">
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Samples</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {models?.map((model) => (
            <TableRow
              key={model.modelId}
              onClick={() => handleRedirect(model.id)}
              className="cursor-pointer h-16 hover:bg-white/10 hover:shadow-lg hover:shadow-neutral-400/20"
            >
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>
                <div>
                <Badge
                  className="flex gap-2 items-center w-max"
                  variant={model.status === "finished" ? "finished" : "secondary"}
                >
                  {model.status === "finished" ? "Finished, click to view" : model.status === "processing" ? "training" : model.status}
                  {model.status === "processing" && (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  )}
                </Badge>
                </div>
              </TableCell>
              <TableCell>{model.type}</TableCell>
              <TableCell>
                <div className="flex gap-2 flex-shrink-0 items-center">
                  {model.samples.slice(0, 3).map((sample) => (
                    <Avatar key={sample.id}>
                      <AvatarImage src={sample.uri} className="object-cover" />
                    </Avatar>
                  ))}
                  {model.samples.length > 3 && (
                    <Badge className="rounded-full h-10" variant={"outline"}>
                      +{model.samples.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
