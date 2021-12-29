
export default async (req, res) => {
  // POST以外は拒否
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} not allowed` })
  }

  const { name, email, password } = req.body
  const body = JSON.stringify({
    name,
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
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register/`
  // console.log(apiUrl)

  // backendサーバコール
  try {
    const apiRes = await fetch(apiUrl, payload)
    const data = await apiRes.json()
    if (apiRes.status === 201) {
      return res.status(200).json({ error: 'アカウント登録に成功しました' })
    }
    else {
      return res.status(500).json({ error: 'アカウント登録に失敗しました' })
    }
  }
  catch(e) {
    return res.status(500).json({ error: 'アカウント登録に失敗しました' })
  }

}