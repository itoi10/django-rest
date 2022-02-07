import {
  // 新規投稿
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,
  // 読込中
  SET_POST_LOADING,
  REMOVE_POST_LOADING,
  // 状態解除
  RESET_POST_STATUS
} from './types'

// 新規投稿
export const new_post = (title:string, image:any, content:string) => async (dispatch) => {
  // ロード中に設定
  dispatch({ type: SET_POST_LOADING, })

  // 今まではJSON形式で送信してたが
  // 画像ファイルを送信するのでFormDataを使用
  const formData = new FormData()
  formData.append('title', title)
  formData.append('content', content)
  formData.append('image', image)

  try {
    // APIコール(front)
    const res = await fetch('api/post/new_post', {
      method: 'GET',
    })
    // レスポンスにはアクセストークンが格納されている
    const data = await res.json()

    // APIコール(back)
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${data.access}`,
      },
      body: formData,
    })
    if (res2.status === 201) {
      // 投稿成功
      dispatch({ type: NEW_POST_SUCCESS,  })
    }
    else {
      // 投稿失敗
      dispatch({ type: NEW_POST_FAIL, })
    }
  }
  catch (err) {
    // 投稿失敗
    dispatch({ type: NEW_POST_FAIL, })
  }

  // ロード中を解除
  dispatch({ type: REMOVE_POST_LOADING })
}

// 状態解除
export const reset_post_status = () => (dispatch) => {
  dispatch({ type: RESET_POST_STATUS,  })
}