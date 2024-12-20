'use client'

import { useEffect, useState } from 'react'

interface Snowflake {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    // Create initial snowflakes
    const initialSnowflakes: Snowflake[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.6 + 0.4
    }))

    setSnowflakes(initialSnowflakes)

    // Animation loop
    let animationFrameId: number
    let lastTime = 0

    const animate = (currentTime: number) => {
      if (lastTime === 0) {
        lastTime = currentTime
      }
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      setSnowflakes(prevSnowflakes => 
        prevSnowflakes.map(flake => ({
          ...flake,
          y: flake.y + flake.speed * (deltaTime * 0.05),
          x: flake.x + Math.sin(currentTime * 0.001 + flake.id) * 0.5,
          ...(flake.y > window.innerHeight 
            ? {
                y: -10,
                x: Math.random() * window.innerWidth
              }
            : {})
        }))
      )

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    // Handle window resize
    const handleResize = () => {
      setSnowflakes(prevSnowflakes => 
        prevSnowflakes.map(flake => ({
          ...flake,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        }))
      )
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.x}px`,
            top: `${flake.y}px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            filter: 'blur(1px)',
            transition: 'transform 0.1s ease-out'
          }}
        />
      ))}
    </div>
  )
} 