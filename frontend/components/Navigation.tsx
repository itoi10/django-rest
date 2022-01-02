import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/auth'

const Navigation:React.FC = () => {
  const dispatch = useDispatch()
  // 認証状態取得
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)

  // ログアウト
  const logoutHandler = async () => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
      await dispatch(logout())
    }
  }

  return (
    <>
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex item-center justify-between">
            <div>
              <Link href='/'>
                <a className="text-white hover:text-gray-50 font-extrabold text-lg">
                  トップページ
                </a>
              </Link>
            </div>
            <div>
              {isAuthenticated ? (
                // ログイン済
                <div onClick={logoutHandler} className="cursor-pointer button-nav">
                  ログアウト
                </div>
              ): (
                // 未ログイン
                <div>
                  <Link href='/login'>
                    <a className="button-nav mr-4">
                      ログイン
                    </a>
                  </Link>
                  <Link href='/register'>
                    <a className="button-nav">
                      アカウント登録
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation