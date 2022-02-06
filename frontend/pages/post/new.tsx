import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
// import { new_post } from '../../redux/actions/post' TODO
import Loader from 'react-loader-spinner'
import Head from 'next/head'


const NewPost:React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const loading = useSelector((state:any) => state.post.loading)
  const new_post_success = useSelector((state:any) => state.post.new_post_success)

  // 画像, タイトル, 説明
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  })
  const { title, content } = formData

  // 入力
  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // 送信ボタン
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) =>  {
    e.preventDefault()
    // 新規投稿処理
    if(dispatch && dispatch !== null && dispatch !== undefined) {
      // await dispatch(new_post(title, image, content)) TODO
    }
  }

  // 投稿に成功したらトップページに遷移
  if (new_post_success) {
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>DjangoREST Next.js App | 新規投稿</title>
      </Head>

      <div className="text-center text-2xl mb-5">新規作成</div>
      {/* 入力フォーム */}
      <form className="md:w-1/3 mx-auto" onSubmit={onSubmit}>
        {/* タイトル */}
        <div className="mb-4">
          <label className="mb-1" htmlFor="title">タイトル</label>
          <input
            className="input-form"
            type="text"
            name="title"
            placeholder="タイトル"
            onChange={onChange}
            value={title}
            required
          />
        </div>
        {/* 画像 */}
        <div className="mb-4">
          <label htmlFor="image" className="mb-1">画像</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        {/* 説明 */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-1">説明</label>
          <textarea
            className="input-form h-72"
            name="content"
            placeholder="説明"
            onChange={onChange}
            value={content}
            required
          />
        </div>
        {/* 送信ボタン */}
        <div className="flex justify-center">
          {loading ? (
            <Loader type="Oval" color="F59E00" width={50} height={50} />
          ) : (
            <button className="button-yellow" type="submit">送信</button>
          )}
        </div>
      </form>
    </>
  )
}

export default NewPost