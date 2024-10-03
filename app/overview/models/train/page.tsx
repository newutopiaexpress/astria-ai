import TrainModelZone from "@/components/TrainModelZone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { CloseIcon } from "@/components/ui/close-icon";
import Image from "next/image";

export default async function Index() {
  return (

    <div className="relative w-full mx-auto bg-transparent py-10 shadow-none">
        <Link href="/overview" className="text-sm w-fit">
          <Button variant={"ghost"} className="text-xs absolute top-0 right-1 " size="sm">
            <CloseIcon/>
          </Button>
        </Link>
      <div
        id="train-model-container"
        className="flex flex-1 flex-col relative "
      >
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="grid gap-6">
            <TrainModelZone />
          </CardContent>
        </Card>
      </div>
    </div>


  );
}




