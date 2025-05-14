'use client'

import { useEffect, useState } from 'react'

interface Message {
  _id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export default function MessageList({ refreshTrigger }: { refreshTrigger: number }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/messages')
        if (!response.ok) {
          throw new Error('Failed to fetch messages')
        }
        const data = await response.json()
        setMessages(data)
      } catch (err) {
        setError('Failed to load messages')
        console.error('Error fetching messages:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()
  }, [refreshTrigger])

  if (isLoading) {
    return <div className="text-center">Loading messages...</div>
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>
  }

  if (messages.length === 0) {
    return <div className="text-center text-gray-500">No messages yet. Be the first to write one!</div>
  }

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div key={message._id} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{message.name}</h3>
              <p className="text-gray-500 text-sm">{message.email}</p>
            </div>
            <time className="text-sm text-gray-500">
              {new Date(message.createdAt).toLocaleDateString()}
            </time>
          </div>
          <p className="mt-2 text-gray-700 whitespace-pre-wrap">{message.message}</p>
        </div>
      ))}
    </div>
  )
} 