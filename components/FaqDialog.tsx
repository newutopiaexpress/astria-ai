import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import Image from "next/image";


export default function FaqDialog() {
    return (
      <div>
                            <Dialog>
                                <DialogTrigger className="underline underline-offset-1 italic">How to get the best results?</DialogTrigger>
                                <DialogContent className="p-6">
                                    <DialogHeader>
                                    <DialogTitle className="font-thin text-3xl mb-6">
                                      How to get the best results?
                                    </DialogTitle>
                                    <p className="text-md max-w-lg">Variation is key - Change body pose for every picture, use pictures from different days backgrounds and lighting.</p>
                                    <DialogDescription>
                                      <div className="mt-6 grid md:grid-cols-2 gap-4">
                                        <div className="col-span-1">
                                            <h1 className="font-bold pb-2 text-green-500">Good examples</h1>
                                            <Image
                                              src="/howto1.png"
                                              width={563}
                                              height={229}
                                              alt="Good Example"
                                              className="active w-80 h-auto mb-2">
                                            </Image>
                                            <ul className="list-disc leading-8 pl-6">
                                              <li>Use shoulders-up images</li>
                                              <li>Waist-up images are also good</li>
                                              <li>Looking at the camera</li>
                                            </ul>
                                        </div>

                                        <div className="col-span-1">
                                            <h1 className="font-bold pb-2 text-red-600">Bad examples</h1>
                                            <Image
                                              src="/howto2.png"
                                              width={563}
                                              height={229}
                                              alt="Good Example"
                                              className="active w-80 h-auto mb-2">
                                            </Image>
                                            <ul className="list-disc leading-8 pl-6">
                                              <li>Filters</li>
                                              <li>Extra people</li>
                                              <li>Funny-faces</li>
                                              <li>Bad angles</li>
                                              <li>Hat, glasses</li>
                                            </ul>
                                        </div>

                                      </div>
                                    </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                              </Dialog>
      </div>
    )
  }


  export function WarningIcon() {
    return (
  <svg className="w-6 h-6 text-stone-800 float-left mr-2" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    )
  }
  