'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const messages = [
  "Reveal your essence by removing layers.",
  "Strip away distractions, find your truth.",
  "Beyond backgrounds lies your true self.",
  "Simplify visuals, deepen your existence.",
  "Erase the background, uncover inner clarity.",
  "Remove clutter, illuminate your core being.",
  "Less background, more authentic you.",
  "Discard the backdrop, embrace your essence.",
  "Transparency reveals the soul within.",
  "Clear backgrounds, profound self-discovery awaits.",
  "What remains when backgrounds vanish?",
  "Who are you without the backdrop?",
  "Can clarity reveal your true essence?",
  "What lies beneath the visual noise?",
  "Are you more than your surroundings?",
  "What defines you beyond the background?",
  "Is your essence hidden by layers?",
  "How clear is your true self?",
  "What story remains without the background?",
  "Do backgrounds mask your inner self?"
]

export function TypewriterText() {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * messages.length))
  const [isDeleting, setIsDeleting] = useState(false)
  const [usedIndices, setUsedIndices] = useState<number[]>([])

  const getNextRandomIndex = useCallback(() => {
    const availableIndices = messages
      .map((_, index) => index)
      .filter(index => !usedIndices.includes(index))

    if (availableIndices.length === 0) {
      setUsedIndices([])
      return Math.floor(Math.random() * messages.length)
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
    setUsedIndices(prev => [...prev, randomIndex])
    return randomIndex
  }, [usedIndices])

  useEffect(() => {
    const message = messages[currentIndex]
    const timeoutDelay = isDeleting ? 35 : 70

    const handleTyping = () => {
      setCurrentText(prev => {
        if (!isDeleting) {
          if (prev.length < message.length) {
            return message.slice(0, prev.length + 1)
          } else {
            setTimeout(() => setIsDeleting(true), 5000)
            return prev
          }
        } else {
          if (prev.length > 0) {
            return prev.slice(0, -1)
          } else {
            setIsDeleting(false)
            const nextIndex = getNextRandomIndex()
            setCurrentIndex(nextIndex)
            return prev
          }
        }
      })
    }

    const timeout = setTimeout(handleTyping, timeoutDelay)
    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentIndex, getNextRandomIndex, messages])

  return (
    <div className="h-[60px] flex items-center justify-center">
      <h1 className="text-4xl font-bold text-center translate-y-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          {currentText}
        </span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[3px] h-[40px] ml-1 bg-purple-500"
        />
      </h1>
    </div>
  )
} 