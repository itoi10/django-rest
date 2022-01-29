import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/auth'

import {
  HomeIcon,
  LogoutIcon,
  LoginIcon,
  PlusCircleIcon,
  UserAddIcon,
  UserIcon
} from '@heroicons/react/outline'

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
    <div className="sticky top-0 bg-white z-10">
      <div className="border-b py-3">
        <div className="max-w-5xl mx-auto flex justify-between px-4">
          <div className="text-lg font-extrabold">
            <Link href="/">
              <a>AppName</a>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/">
              <a>
                <HomeIcon className="h-7 w-7"/>
              </a>
            </Link>

            {/* ログインしているか？ */}
            {isAuthenticated ? (
              <div className="fle space-x-4">
                {/* 新規投稿 */}
                <Link href="/post/new">
                  <a>
                    <PlusCircleIcon className="h-7 w-7"/>
                  </a>
                </Link>
                {/* プロフィール */}
                <Link href="/profile">
                  <a>
                    <UserIcon className="h-7 w-7"/>
                  </a>
                </Link>
                {/* ログアウト */}
                <div onClick={logoutHandler} className="cursor-pointer">
                  <LogoutIcon className="h-7 w-7"/>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                {/* ログイン */}
                <Link href="/login">
                  <a>
                    <LoginIcon className="h-7 w-7"/>
                  </a>
                </Link>
                {/* アカウント登録 */}
                <Link href="/register">
                  <a>
                    <UserAddIcon className="h-7 w-7"/>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation