import cookie from 'cookie'

export default async (req, res) => {
  // GET以外は拒否
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }

  // cookieからアクセストークン取得
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const accessToken = cookies.access ?? false
  if (accessToken === false) {
    return res.status(403).json({ error: 'アクセストークンがありません' })
  }

  const body = JSON.stringify({
    token: accessToken,
  })
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/verify/`
  // backend APIコール
  try {
    const apiRes = await fetch(apiUrl, payload)
    if (apiRes.status === 200) {
      return res.status(200).json({ success: '認証に成功しました' })
    }
    else {
      return res.status(apiRes.status).json({ error: '認証に失敗しました' })
    }
  }
  catch {
    return res.status(500).json({ error: '認証に失敗しました' })
  }
}