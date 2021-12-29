import {
  REGISTER_SUCCESS, REGISTER_FAIL, SET_AUTH_LOADING, REMOVE_AUTH_LOADING
} from './types'

// アカウント登録
export const register = (name:string, email:string, password:string) => async (dispatch) => {
  // ロード中に設定
  dispatch( { type: SET_AUTH_LOADING } )

  const body = JSON.stringify({
    name,
    email,
    password,
  })
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body
  }
  // APIコール
  try {
    const res = await fetch('/api/account/register', payload)
    if (res.status === 200) {
      dispatch( { type: REGISTER_SUCCESS } )
    }
    else {
      dispatch( { type: REGISTER_FAIL } )
    }
  }
  catch(e) {
    dispatch( { type: REGISTER_FAIL } )
  }

  // ロード中を解除
  dispatch( { type: REMOVE_AUTH_LOADING } )
}