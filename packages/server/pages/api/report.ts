// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

import type { NextApiRequest, NextApiResponse } from 'next'
import { ReportRequest } from '../../../common/type/api/report'

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
  const body: ReportRequest = req.body
  // console.log('body', body)

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const docRef = await addDoc(collection(db, `report`), {
    title: body.title,
    data: body.data,
    summary: body.summary,
    date: Date.now(),
  })
  // const analytics = getAnalytics(app);

  res.status(200).json({ result: 'OK' })
}
