import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getPostIds, getPostDetail } from '../../../lib/posts'
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";


// SWR用fetcher関数. URLをフェッチしてJSON形式で返す
const fetcher = (url:string) => fetch(url).then((res) => res.json())

const DetailPost:React.FC = ({staticPost, id}:any) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state:any) => state.auth.user)

  // SWR https://swr.vercel.app/ja/docs/getting-started
  const { data: post, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post_detail/${id}/`,
    fetcher,
    // SSRやSSGでリクエスト前に取得したデータを初期値に設定
    {
      fallbackData: staticPost,
    }
  )

  // 最新データ取得
  useEffect(() => {
    mutate()
  }, [])

  // 投稿が取得でき慣れけばLoadingテキスト表示
  if (router.isFallback || !post) {
    return <div className="text-center">Loading...</div>
  }

  console.log(id)
  console.log(staticPost)

  return (
    <>
      <Head>
        <title>DjangoREST Next.js App | 詳細</title>
      </Head>

      {post && (
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="grid grid-cols-3 bg-white border">

            {/* 投稿画像 */}
            <div className="col-span-2">
              <Image
                src={post.image}
                alt={post.title}
                width={1000}
                height={1000}
                objectFit="cover"
              />
            </div>

            {/* 投稿者情報, タイトル等 */}
            <div className="col-span-1">
              <div className="border-b p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <Image
                    src={post.user.image}
                    className="rounded-full"
                    alt={post.title}
                    width={40}
                    height={40}
                    objectFit="cover"
                  />
                  <div>
                    <div>{post.user.name}</div>
                    <div>{post.title}</div>
                  </div>
                </div>
              </div>
              <div className="whitespace-pre p-4">
                <div className="leading-relaxed break words whitespace-pre-wrap">
                  {post.content}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default DetailPost


// Next.js 9.3新API getStaticProps と getStaticPaths と getServerSideProps の概要解説
// https://qiita.com/matamatanot/items/1735984f40540b8bdf91

// 投稿ID一覧取得
export const getStaticPaths: GetStaticPaths = async() => {
  const paths = await getPostIds()
  return {
    paths,
    fallback: "blocking",
  }
}

// 投稿詳細取得
export const getStaticProps:GetStaticProps = async({ params }) => {
  const staticPost = await getPostDetail(params.id)

  return {
    props: {
      id: staticPost.id,
      staticPost,
    },
    revalidate: 1,
  }
}