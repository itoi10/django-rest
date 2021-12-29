import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
// import { register } from '../actions/auth'
import Loader from 'react-loader-spinner'
import Head from 'next/head'

const Register:React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)
  const loading = useSelector((state:any) => state.auth.loading)

  // 入力項目
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = formData

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
  }

  return (
    <>
      <Head>
        <title>アカウント登録</title>
      </Head>

      <div className="text-center text-2xl mb-5">
        アカウント登録
      </div>

      <form className="w-1/3 mx-auto" onSubmit={onSubmit} >
        {/* 名前 */}
        <div className="mb-4">
          <label className="mb-1" htmlFor="name">
            名前
          </label>
          <input
            className="input-form"
            type="text"
            name="name"
            placeholder="名前を入力してください"
            onChange={onChange}
            value={name}
            required
          />
        </div>

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
            placeholder="半角英数字8文字以上"
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

export default Register