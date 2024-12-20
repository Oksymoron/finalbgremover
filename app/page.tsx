'use client'

import { useState } from 'react'
import { useImageProcessor } from '../hooks/useImageProcessor'
import { Button } from '../components/Button'
import { ImageDropzone } from '../components/ImageDropzone'
import { ImageDisplay } from '../components/ImageDisplay'
import { BackgroundAnimation } from '../components/BackgroundAnimation'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { TypewriterText } from '../components/TypewriterText'

async function downloadImage(url: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
    alert('Failed to download image. Please try again.');
  }
}

export default function Home() {
  const {
    originalImage,
    processedImage,
    isProcessing,
    handleImageUpload,
    processImage,
    resetImages,
  } = useImageProcessor()
  const [activeTab, setActiveTab] = useState<'original' | 'processed'>('original')

  return (
    <main className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto px-4 py-12 w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <TypewriterText />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-grow flex flex-col"
        >
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-800/50">
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="inline-flex rounded-lg overflow-hidden p-1 bg-gray-800/50">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-tab="original"
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'original'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('original')}
                >
                  Original
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-tab="processed"
                  className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === 'processed'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('processed')}
                >
                  Processed
                </motion.button>
              </div>
            </motion.div>
            <motion.div 
              className="h-[480px] mb-8 rounded-2xl overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {originalImage && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute top-4 right-4 z-10 p-2 bg-gray-900/80 rounded-full hover:bg-gray-800 transition-colors"
                  onClick={resetImages}
                  title="Remove image"
                >
                  <X className="w-5 h-5 text-gray-300" />
                </motion.button>
              )}
              {activeTab === 'original' ? (
                originalImage ? (
                  <ImageDisplay src={originalImage} alt="Original" />
                ) : (
                  <ImageDropzone onImageUpload={handleImageUpload} />
                )
              ) : (
                processedImage ? (
                  <ImageDisplay 
                    src={processedImage} 
                    alt="Processed" 
                    isProcessed 
                    originalImage={originalImage}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    {isProcessing ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center"
                      >
                        <div className="loading-spinner mb-4"></div>
                        Processing...
                      </motion.div>
                    ) : (
                      'No processed image yet'
                    )}
                  </div>
                )
              )}
            </motion.div>
            <motion.div 
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                onClick={processImage}
                disabled={!originalImage || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Remove Background'}
              </Button>
              <Button
                variant="secondary"
                disabled={!processedImage}
                onClick={() => {
                  if (processedImage) {
                    downloadImage(processedImage);
                  }
                }}
              >
                Download
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

