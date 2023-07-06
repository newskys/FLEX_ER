// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initializeApp } from 'firebase/app'
import { collection, getDocs, getFirestore } from 'firebase/firestore'

import type { NextApiRequest, NextApiResponse } from 'next'

interface Result {
  result: string
  data?: any
}

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_VERCEL_FIREBASE_API_KEY,
  authDomain: 'flexer-4150a.firebaseapp.com',
  projectId: 'flexer-4150a',
  storageBucket: 'flexer-4150a.appspot.com',
  messagingSenderId:
    process.env.NEXT_PUBLIC_VERCEL_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_VERCEL_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_VERCEL_FIREBASE_MEASUREMENT_ID,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>,
) {
  // const lastReadTime = req.query.lastReadTime

  // if (typeof lastReadTime !== 'string') {
  //   res.status(400).json({ result: 'invalid parameter' })
  //   return
  // }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  // const q = query(
  //   collection(db, 'notice'),
  //   where('date', '>', parseInt(lastReadTime)),
  // )
  // const querySnapshot = await getDocs(notices)

  const querySnapshot = await getDocs(collection(db, 'notice'))

  const data = querySnapshot.docs.map((doc) => ({
    title: doc.get('title'),
    contents: doc.get('contents'),
    date: doc.get('date'),
  }))

  res.status(200).json({ result: 'OK', data })
}
