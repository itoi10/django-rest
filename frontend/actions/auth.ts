import {
  REGISTER_SUCCESS, REGISTER_FAIL,
  LOGIN_SUCCESS, LOGIN_FAIL,
  USER_SUCCESS, USER_FAIL,
  SET_AUTH_LOADING, REMOVE_AUTH_LOADING
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

// ログイン
export const login = (email:string, password:string) => async(dispatch) => {
  dispatch( { type: SET_AUTH_LOADING } )

  const body = JSON.stringify({
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
    const res = await fetch('/api/account/login', payload)
    if (res.status === 200) {
      dispatch( { type: LOGIN_SUCCESS } )
      // ユーザー情報取得
      dispatch(user())
    }
    else {
      dispatch( { type: LOGIN_FAIL } )
    }
  }
  catch(e) {
    dispatch( { type: LOGIN_FAIL } )
  }

  dispatch( { type: REMOVE_AUTH_LOADING } )
}

// ユーザー情報取得
export const auth = (email:string, password:string) => async(dispatch) => {
  dispatch( { type: SET_AUTH_LOADING } )

  try {
    const res = await fetch('/api/account/user', {method: 'GET'})
    const data = await res.json()
    if (res.status === 200) {
      dispatch({
        type: USER_SUCCESS,
        payload: data,
      })
    }
    else {
      dispatch( { type: USER_FAIL } )
    }
  }
  catch(e) {
    dispatch( { type: USER_FAIL } )
  }


  dispatch( { type: REMOVE_AUTH_LOADING } )
}