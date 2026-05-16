'use client'

import { SuiteImage } from "@/lib/mock"
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface GalleryProps {
  images: SuiteImage[];
  alt: string;
}

export function Gallery({ alt, images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary">
        <Image
          src={images[selectedIndex].url}
          alt={`${alt} - Imagem ${selectedIndex + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className={cn('size-20 relative shrink-0 overflow-hidden rounded-md transition-all',
                selectedIndex === index
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                  : 'opacity-60 hover:opacity-100'
              )}>
                <Image
                src={image.url}
                alt={`${alt} - Miniatura ${index + 1}`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}