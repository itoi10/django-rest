import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getPostList } from '../lib/posts'
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";


// SWR用fetcher関数. URLをフェッチしてJSON形式で返す
const fetcher = (url:string) => fetch(url).then((res) => res.json())

const Index:React.FC = ({staticPosts}:any) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state:any) => state.auth.user)

  // SWR データ取得のための React Hooks ライブラリ
  // https://swr.vercel.app/ja/docs/getting-started
  const { data: posts, mutate } = useSWR(
    // URL
    `${process.env.NEXT_PUBLIC_API_URL}/api/post_list/`,
    // fetcher関数
    fetcher,
    // SSRやSSGではuseSWRでリクエスト前にデータを取得していることがあるので、fallbackDataであらかじめ初期値に設定できる
    {
      fallbackData: staticPosts,
    }
  )

  // 最新データ取得
  useEffect(() => {
    mutate()
  }, [])

  // 投稿が取得でき慣れけばLoadingテキスト表示
  if (router.isFallback || !posts) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <>
      <Head>
        <title>DjangoREST Next.js App</title>
      </Head>

      <div className="max-w-screen-lg mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {/* 投稿データ表示 */}
            {posts && posts.map((data) => (
              <div className="border mb-6 bg-white" key={data.id}>
                <div className="flex items-center space-x-4 p-4">
                  {/* 投稿者プロフィール画像 */}
                  <Image
                    src={data.user.image}
                    className="rounded-full"
                    alt={data.user.name}
                    width={40}
                    height={40}
                    objectFit="cover"
                  />
                  <div>
                    {/* 投稿者名 */}
                    <div>{data.user.name}</div>
                    {/* タイトル */}
                    <div>{data.title}</div>
                  </div>
                </div>
                <div>
                  {/* 投稿画像 (投稿詳細へのリンク) */}
                  <Link href={`/post/${data.id}`}>
                    <a>
                      <Image
                        src={data.image}
                        className=""
                        alt={data.title}
                        width={1000}
                        height={1000}
                        objectFit="cover"
                      />
                    </a>
                  </Link>
                </div>
                <div className="m-4">
                  {/* 投稿者名 */}
                  <div>{data.user.name}</div>
                  {/* 説明文 */}
                  <div className="truncate">{data.content}</div>
                </div>
              </div>
            ))}
          </div>
          {/* ログイン中であればプロフィール表示 */}
          <div className="col-span-1">
            {user && (
              <div className="flex items-center space-x-4">
                <Image
                  src={user.image}
                  className="rounded-full"
                  alt={user.name}
                  width={50}
                  height={50}
                  objectFit="cover"
                />
                <div>{user.name}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

// SSG
export const getStaticProps:GetStaticProps = async() => {
  const staticPosts = await getPostList()

  return {
    props: {staticPosts},
    revalidate: 1,
  }
}