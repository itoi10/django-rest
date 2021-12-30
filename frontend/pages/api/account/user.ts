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
    return res.status(401).json({ error: 'アクセストークンがありません' })
  }

  const payload = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/`

  try {
    const apiRes = await fetch(apiUrl, payload)
    const data = await apiRes.json()
    if (apiRes.status === 200) {
      return res.status(200).json({ user: data.user })
    }
    else {
      return res.status(apiRes.status).json({ error: 'ユーザー情報取得に失敗しました' })
    }
  }
  catch {
    return res.status(500).json({ error: 'ユーザー情報取得に失敗しました' })
  }

}