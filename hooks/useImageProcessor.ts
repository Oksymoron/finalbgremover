import { useState } from 'react'

export function useImageProcessor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const resetImages = () => {
    setOriginalImage(null)
    setProcessedImage(null)
    setIsProcessing(false)
  }

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setOriginalImage(e.target.result as string)
        setProcessedImage(null)
      }
    }
    reader.readAsDataURL(file)
  }

  const processImage = async () => {
    if (!originalImage) return

    try {
      setIsProcessing(true)

      // Convert base64 to blob
      const response = await fetch(originalImage)
      const blob = await response.blob()

      // Create FormData and append the image
      const formData = new FormData()
      formData.append('image', blob)

      // Make API call to your backend endpoint
      const result = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      })

      if (!result.ok) {
        const errorData = await result.json()
        throw new Error(errorData.error || 'Failed to process image')
      }

      const data = await result.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Store the processed image URL
      setProcessedImage(data.url)
      
      // Automatically switch to processed tab
      if (typeof window !== 'undefined') {
        const processedButton = document.querySelector('[data-tab="processed"]')
        if (processedButton instanceof HTMLElement) {
          processedButton.click()
        }
      }

    } catch (error) {
      console.error('Error processing image:', error)
      alert(error instanceof Error ? error.message : 'Error processing image. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return {
    originalImage,
    processedImage,
    isProcessing,
    handleImageUpload,
    processImage,
    resetImages,
  }
}

