import cookie from 'cookie'

export default async (req, res) => {
  // GET以外は拒否
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }

  // cookieからリフレッシュトークン取得
  const cookies = cookie.parse(req.headers.cookie ?? '')
  const refreshToken = cookies.refresh ?? false
  if (refreshToken === false) {
    return res.status(401).json({ error: 'リフレッシュトークンがありません' })
  }


  const body = JSON.stringify({
    refreshToken,
  })

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body,
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/refresh/`
  // backend APIコール
  try {
    const apiRes = await fetch(apiUrl, payload)
    const data = await apiRes.json()
    if (apiRes.status === 200) {
      // 再発行されたアクセストークンをcookieに上書き
      res.setHeader('Set-Cookie', [
        cookie.serialize('access', data.access, {
          httpOnly: false,
          secure: true,
          sameSite: 'Lax',
          path: '/',
          maxAge: 60 * 60, // アクセストークンは短めの1時間
        })
      ])
      return res.status(200).json({ success: 'リフレッシュトークン取得に成功しました' })
    }
    else {
      return res.status(apiRes.status).json({ error: 'リフレッシュトークン取得に失敗しました' })
    }
  }
  catch {
    return res.status(500).json({ error: 'リフレッシュトークン取得に失敗しました' })
  }

}