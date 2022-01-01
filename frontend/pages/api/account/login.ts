// cookieを使う
import cookie from 'cookie'

export default async (req, res) => {
  // POST以外は拒否
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }

  const { email, password } = req.body
  const body = JSON.stringify({
    email,
    password,
  })
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/login/`

  // backendサーバコール
  try {
    const apiRes = await fetch(apiUrl, payload)
    const data = await apiRes.json()
    console.log(data)
    if (apiRes.status === 200) {
      // アクセストークンとリフレッシュトークンをcookieに保存する
      res.setHeader('Set-Cookie', [
        cookie.serialize('access', data.access, {
          httpOnly: false,
          secure: true,
          sameSite: 'Lax',
          path: '/',
          maxAge: 60 * 60, // アクセストークンは短めの1時間
        }),
        cookie.serialize('refresh', data.refresh, {
          httpOnly: false,
          secure: true,
          sameSite: 'Lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 3, // リフレッシュトークンは長めの3日
        })
      ])

      return res.status(200).json({ error: 'ログインに成功しました' })
    }
    else {
      return res.status(500).json({ error: 'ログインに失敗しました' })
    }
  }
  catch(e) {
    return res.status(500).json({ error: 'ログインに失敗しました' })
  }
}