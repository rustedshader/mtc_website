import React from "react";
import Image from "next/image";
import { getAllImagesNameInDir } from "@/lib/fileUtils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { GalleryIcon } from "@/components/gallery-icon";
import { ZoomIn } from "lucide-react";

export default async function Gallery() {
  const images = await getAllImagesNameInDir("gallery");

  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <section className="relative z-10 w-full py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl text-white font-bold mb-12 text-center">
            Memories
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => {
              const imageName = image.replace(/\.[^/.]+$/, "");
              return (
                <div
                  key={image}
                  className="transform transition-transform duration-300 hover:-translate-y-1"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="group cursor-pointer hover:shadow-2xl transition-all duration-300 h-full overflow-visible relative">
                        <div className="absolute z-20 w-full h-full">
                          <GalleryIcon className="absolute h-8 w-8 -top-4 -left-4 dark:text-white text-black" />
                          <GalleryIcon className="absolute h-8 w-8 -bottom-4 -left-4 dark:text-white text-black" />
                          <GalleryIcon className="absolute h-8 w-8 -top-4 -right-4 dark:text-white text-black" />
                          <GalleryIcon className="absolute h-8 w-8 -bottom-4 -right-4 dark:text-white text-black" />
                        </div>

                        <CardContent className="p-2 h-[300px]">
                          <div className="relative w-full h-full overflow-hidden rounded-lg">
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                              <ZoomIn className="w-10 h-10 text-white" />
                            </div>
                            <Image
                              src={`/gallery/${image}`}
                              alt={imageName}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              loading="lazy"
                              role="img"
                              aria-label={imageName}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>

                    <DialogContent className="max-w-5xl">
                      <DialogHeader className="flex flex-row items-center justify-between">
                        <DialogTitle>

                        </DialogTitle>
                        <div className="flex items-center gap-4">
                          <DialogClose />
                        </div>
                      </DialogHeader>

                      <div className="relative aspect-[3/2] w-full mt-4">
                        <Image
                          src={`/gallery/${image}`}
                          alt={imageName}
                          fill
                          className="object-contain"
                          priority
                          sizes="90vw"
                          loading="eager"
                          role="img"
                          aria-label={imageName}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
