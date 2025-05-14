import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import Message from '@/models/Message'
import mongoose from 'mongoose'

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!)
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw new Error('Error connecting to MongoDB')
  }
}

export async function GET() {
  try {
    await connectDB()
    const messages = await Message.find({}).sort({ createdAt: -1 })
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await connectDB()
    
    const message = await Message.create(body)
    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json({ error: 'Error creating message' }, { status: 500 })
  }
} 