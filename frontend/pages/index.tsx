import React from 'react'
import Head from 'next/head'
import { useSelector } from 'react-redux'

const Index:React.FC = () => {
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)
  const user = useSelector((state:any) => state.auth.user)

  return (
    <>
      <Head>
        <title>Django - Next.js Sample</title>
      </Head>
      <div>
        {isAuthenticated && user ? (
          <div>
          <div>
            <div>ようこそ、{user.name}さん</div>
          </div>
          <div className="my-4 border-4 border-dashed border-gray-200 rounded">
            <div className="flex justify-center items-center h-64">
              コンテンツ１
            </div>
          </div>
          </div>
        ) : (
          <div className="text-center text-2xl">
            Django and Next.js App
          </div>
        )}
      </div>
    </>
  )
}

export default Index