import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload } from 'lucide-react'

interface ImageDropzoneProps {
  onImageUpload: (file: File) => void
}

export function ImageDropzone({ onImageUpload }: ImageDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0])
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={`h-full flex flex-col items-center justify-center border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out ${
        isDragActive ? 'border-blue-500 bg-blue-500 bg-opacity-10' : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
      }`}
    >
      <input {...getInputProps()} />
      <Upload size={48} className="mb-4 text-gray-400" />
      {isDragActive ? (
        <p className="text-blue-500 text-xl font-medium">Drop the image here...</p>
      ) : (
        <p className="text-gray-400 text-xl font-medium text-center">
          Drag and drop an image here,<br />or click to select one
        </p>
      )}
    </div>
  )
}

