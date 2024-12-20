'use client'

import { useState, useEffect, useRef } from 'react'
import { Music, Pause, Play } from 'lucide-react'

export function ChristmasMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/christmas-music.mp3')
    audio.loop = true
    audio.volume = 0.05
    
    audio.addEventListener('canplaythrough', () => {
      console.log('Audio loaded successfully')
      setIsLoaded(true)
    })

    audio.addEventListener('error', (e) => {
      console.error('Audio loading error:', e)
    })

    audioRef.current = audio as HTMLAudioElement

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = async () => {
    if (!audioRef.current || !isLoaded) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.currentTime = 0.5
        await audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } catch (error) {
      console.error('Playback error:', error)
    }
  }

  return (
    <button
      onClick={toggleMusic}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-all duration-300 z-50"
      aria-label={isPlaying ? 'Pause Christmas Music' : 'Play Christmas Music'}
      disabled={!isLoaded}
    >
      {isHovered ? (
        isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-white" />
        )
      ) : (
        <Music className="w-6 h-6 text-white" />
      )}
    </button>
  )
} 