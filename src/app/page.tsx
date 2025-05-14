'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import MessageForm from '@/components/MessageForm'
import MessageList from '@/components/MessageList'
import Link from 'next/link'

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [showLongText, setShowLongText] = useState(false)

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

  function LongText() {
    return (
      <div className="bg-white shadow rounded-lg p-6 mb-8 max-h-[500px] overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contenu Long</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna.
        </p>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna. Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna.
        </p>
        <p>
          (Répéter ce texte pour simuler un contenu très long...)
        </p>
        <p>
          {Array.from({ length: 30 }).map((_, i) => (
            <span key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, velit eu dictum sodales, justo erat ultricies urna, nec dictum ex enim nec urna.<br /><br />
            </span>
          ))}
        </p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 ref={titleRef} className="text-4xl font-bold text-gray-900 mb-4">Livre d&apos;Or</h1>
          <p className="text-lg text-gray-600">
            Laissez un message pour partager vos pensées et vos expériences.
          </p>
          <Link href="/long-text">
            <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
              Voir du contenu long
            </button>
          </Link>
        </div>

        {showLongText ? (
          <LongText />
        ) : (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ajouter un message</h2>
            <MessageForm onMessageAdded={handleMessageAdded} />
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Messages récents</h2>
          <MessageList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </main>
  )
}
