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
    confirmPassword: '',
  })

  const { name, email, password, confirmPassword } = formData

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
    // 入力チェック
    const reMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (!reMail.test(email)) {
      alert('メールアドレスが正しい形式ではありません')
      return
    }
    const rePwd = /^[a-zA-Z0-9]{8,24}$/
    if (!rePwd.test(password)) {
      alert('パスワードは半角英数字 8文字以上24文字以内で入力してください')
      return
    }
    if (password != confirmPassword) {
      alert('パスワードが一致しません')
      return
    }
    // 登録処理
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      // await dispatch(register(name, email, password))
    }
  }

  // 認証済みであればトップページへ遷移
  if (typeof window !== 'undefined' && isAuthenticated) {
    router.push('/')
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

        {/* パスワード(確認用) */}
        <div className="mb-4">
          <label className="mb-1" htmlFor="confirmPassword">
            パスワード(確認用)
          </label>
          <input
            className="input-form"
            type="password"
            name="confirmPassword"
            placeholder=""
            onChange={onChange}
            value={confirmPassword}
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