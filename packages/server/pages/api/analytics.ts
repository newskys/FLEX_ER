// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface Result {
  result: string
  data?: any
}

const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect'

export const firebaseConfig = {
  measurementId: process.env.NEXT_PUBLIC_VERCEL_FIREBASE_MEASUREMENT_ID,
  apiSecret: process.env.NEXT_PUBLIC_VERCEL_FIREBASE_API_SECRET,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>,
) {
  // console.log('req.body.parsed', JSON.stringify(req.body))
  await fetch(
    `${GA_ENDPOINT}?measurement_id=${firebaseConfig.measurementId}&api_secret=${firebaseConfig.apiSecret}`,
    {
      method: 'POST',
      body: JSON.stringify(req.body),
    },
  )

  res.status(200).json({ result: 'OK' })
}
