import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { login } from '../redux/actions/auth'
import Loader from 'react-loader-spinner'
import Head from 'next/head'


const Login:React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)
  const loading = useSelector((state:any) => state.auth.loading)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  // 入力
  const onChange = (e) => {
    const key = e.target.name
    const val = e.target.value
    setFormData({
      ...formData,
      [key]: val
    })
  }

  // 送信
  const onSubmit = async (e) => {
    e.preventDefault()
    // ログイン
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      await dispatch(login(email, password))
    }
  }

  // 認証済みであればトップページへ遷移
  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>

      <div className="text-center text-2xl mb-5">ログイン</div>

      <form className="w-1/3 mx-auto" onSubmit={onSubmit}>
        {/* メールアドレス */}
        <div className="mb-4">
          <label className="mb-1" htmlFor="email">
            メールアドレス
          </label>
          <input
            className="input-form"
            type="email"
            name="email"
            placeholder="xxx@example.com"
            onChange={onChange}
            value={email}
            required
          />
        </div>
        {/* パスワード */}
        <div className="mb-4">
          <label className="mb-1" htmlFor="password">
            パスワード
          </label>
          <input
            className="input-form"
            type="password"
            name="password"
            placeholder=""
            onChange={onChange}
            value={password}
            required
          />
        </div>
        {/* 送信ボタン */}
        <div className="flex justify-center">
          {loading ? (
            <Loader type="Oval" color="#F59E00" width={50} height={50}/>
          ) : (
            <button className="button-yellow" type="submit">
              送信
            </button>
          )}
        </div>
      </form>
    </>
  )
}

export default Login