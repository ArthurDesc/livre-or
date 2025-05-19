'use client'

import { useState, FormEvent } from 'react'

export default function MessageForm({ onMessageAdded }: { onMessageAdded: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit message')
      }

      setFormData({ name: '', email: '', message: '' })
      onMessageAdded()
    } catch (err) {
      setError('Failed to submit message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1 tracking-wide">
          Nom
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          maxLength={60}
          className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-md focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-600 focus:outline-none transition-all duration-200 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Votre nom"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1 tracking-wide">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          maxLength={60}
          className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-md focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-600 focus:outline-none transition-all duration-200 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="Votre email"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1 tracking-wide">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          maxLength={1000}
          rows={4}
          className="mt-1 block w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 shadow-md focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-600 focus:outline-none transition-all duration-200 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
          placeholder="Votre message..."
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm font-medium">{error}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex justify-center rounded-xl border border-transparent bg-gradient-to-r from-blue-500 to-purple-500 py-3 px-6 text-base font-semibold text-white shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60"
      >
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>
  )
} 