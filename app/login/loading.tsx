import Image from "next/image";
export default function Loading() {
    return <div className="w-full h-screen">
      <Image src="/utopia-icon.png" className="animate-ping mx-auto mt-72" alt="Loading" width={32} height={30} />
    </div>;
  }