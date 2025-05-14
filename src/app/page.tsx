'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import MessageForm from '@/components/MessageForm'
import MessageList from '@/components/MessageList'

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    }
  }, [])

  const handleMessageAdded = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 ref={titleRef} className="text-4xl font-bold text-gray-900 mb-4">Livre d&apos;Or</h1>
          <p className="text-lg text-gray-600">
            Laissez un message pour partager vos pensées et vos expériences.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ajouter un message</h2>
          <MessageForm onMessageAdded={handleMessageAdded} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Messages récents</h2>
          <MessageList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </main>
  )
}
