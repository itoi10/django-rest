import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

// cookieからアクセストークンを取得し返却する
export default async(req: NextApiRequest, res:NextApiResponse) => {

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({
      error: `Method ${req.method} not allowed`
    })
  }

  // cookieからアクセストークン取得
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const access = cookies.access ?? false

  if (access === false) {
    return res.status(401).json({
      error: 'アクセストークンがありません',
    })
  }

  return res.status(200).json({
    access: access
  })

}