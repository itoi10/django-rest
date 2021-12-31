import {
  REGISTER_SUCCESS, REGISTER_FAIL,
  LOGIN_SUCCESS, LOGIN_FAIL,
  USER_SUCCESS, USER_FAIL,
  REFRESH_SUCCESS, REFRESH_FAIl,
  AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL,
  LOGOUT_SUCCESS, LOGOUT_FAIL,
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
export const user = () => async(dispatch) => {
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

// リフレッシュトークンを使いアクセストークン再発行
export const refresh = () => async(dispatch) => {
  dispatch( { type: SET_AUTH_LOADING } )

  try {
    // アクセストークン再発行
    const res = await fetch('/api/account/refresh', {method: 'GET'})
    const data = await res.json()
    if (res.status === 200) {
      dispatch({ type: REFRESH_SUCCESS })
      // アクセストークンを使用して認証
      dispatch(verify())
    }
    else {
      dispatch( { type: REFRESH_FAIl } )
    }
  }
  catch(e) {
    dispatch( { type: REFRESH_FAIl } )
  }

  dispatch( { type: REMOVE_AUTH_LOADING } )
}

// 認証チェック
export const verify = () => async(dispatch) => {
  dispatch( { type: SET_AUTH_LOADING } )

  try {
    const res = await fetch('/api/account/verify', {method: 'GET'})
    if (res.status === 200) {
      dispatch({ type: AUTHENTICATED_SUCCESS })
      // 認証成功したらユーザー情報取得
      dispatch(user())
    }
    else {
      dispatch( { type: AUTHENTICATED_FAIL } )
    }
  }
  catch(e) {
    dispatch( { type: AUTHENTICATED_FAIL } )
  }

  dispatch( { type: REMOVE_AUTH_LOADING } )
}


// ログアウト
export const logout = () => async(dispatch) => {
  dispatch( { type: SET_AUTH_LOADING } )

  try {
    const res = await fetch('/api/account/logout', {method: 'POST'})
    if (res.status === 200) {
      dispatch({ type: LOGOUT_SUCCESS })
    }
    else {
      dispatch( { type: LOGOUT_FAIL } )
    }
  }
  catch(e) {
    dispatch( { type: LOGIN_FAIL } )
  }

  dispatch( { type: REMOVE_AUTH_LOADING } )
}