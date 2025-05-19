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
    <main className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 ref={titleRef} className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 mb-4 drop-shadow-lg transition-all duration-500">
            NetDart
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Laissez un message pour partager vos pensées et vos expériences.
          </p>
          <button
            onClick={() => setShowLongText((prev) => !prev)}
            className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {showLongText ? 'Retour au formulaire' : 'Voir un contenu long'}
          </button>
        </div>

        {showLongText ? (
          <LongText />
        ) : (
          <div className="bg-white/80 dark:bg-gray-900/80 shadow-2xl rounded-3xl p-8 mb-10 transition-all duration-300 hover:shadow-3xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Ajouter un message</h2>
            <MessageForm onMessageAdded={handleMessageAdded} />
          </div>
        )}

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Messages récents</h2>
          <div className="bg-white/80 dark:bg-gray-900/80 shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl">
            <MessageList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </main>
  )
}
