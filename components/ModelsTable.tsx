"Use Client"
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
import { CheckCircle } from 'lucide-react'

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

  const StatusIndicator = ({ status }: { status: string }) => {
    if (status === "finished") {
      return (
        <Badge
          className="flex gap-2 items-center justify-center w-min"
          variant="finished"
        >
          <CheckCircle className="h-4 w-4" />
        </Badge>
      )
    }

    if (status === "processing") {
      return (
        <Badge
          className="flex gap-2 items-center w-auto"
          variant="secondary"
        >
          processing..
          <Icons.spinner className="h-4 w-4 animate-spin" />
        </Badge>
      )
    }

    return (
      <Badge
        className="flex gap-2 items-center w-[100px]"
        variant="secondary"
      >
        {status}
      </Badge>
    )
  }

  return (
    <div className="rounded-sm border-none shadow-none">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="text-xs opacity-40 border border-b">
            <TableHead className="pl-4 md:pl-6">Name</TableHead>
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
              className="cursor-pointer h-20 border-b border-stone-300/50 hover:shadow-lg hover:shadow-stone-400/20 transition-all group"
            >
              <TableCell className="font-medium pl-4 md:pl-6 w-[33%]">{model.name}</TableCell>
              <TableCell className="w-[130px]">
                <StatusIndicator status={model.status} />
              </TableCell>
              <TableCell className="text-sm w-[130px]">{model.type}</TableCell>
              <TableCell>
                <div className="gap-2 flex flex-shrink-0 items-center md:hidden">
                  {model.samples.slice(0, 1).map((sample) => (
                    <Avatar key={sample.id}>
                      <AvatarImage src={sample.uri} className="object-cover" />
                    </Avatar>
                  ))}
                  {model.samples.length > 1 && (
                    <Badge className="rounded-full h-10 w-10" variant={"outline"}>
                      +{model.samples.length - 1}
                    </Badge>
                  )}
                </div>
                <div className="gap-2 flex-shrink-0 items-center hidden md:flex group relative">
                  {model.samples.slice(0, 4).map((sample) => (
                    <Avatar key={sample.id}>
                      <AvatarImage src={sample.uri} className="object-cover" />
                    </Avatar>
                  ))}
                  {model.samples.length > 4 && (
                    <Badge className="rounded-full h-10 w-10 border border-stone-300" >
                      +{model.samples.length - 4}
                    </Badge>
                  )}
                  <div className="invisible group-hover:visible float-right absolute right-2 sm:hidden md:block"><EyeIcon/></div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


export function EyeIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-stone-700">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>

  )
}

