import React from 'react'
import Link from 'next/link'

const Navigation:React.FC = () => {

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
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation