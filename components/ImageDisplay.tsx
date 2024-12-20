'use client'

import Image from 'next/image'

interface ImageDisplayProps {
  src: string
  alt: string
  isProcessed?: boolean
  originalImage?: string | null
}

export function ImageDisplay({ src, alt }: ImageDisplayProps) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  )
}

