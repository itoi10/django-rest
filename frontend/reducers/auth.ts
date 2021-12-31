import {
  REGISTER_FAIL, REGISTER_SUCCESS,
  LOGIN_SUCCESS, LOGIN_FAIL,
  USER_SUCCESS, USER_FAIL,
  REFRESH_SUCCESS, REFRESH_FAIl,
  AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL,
  REMOVE_AUTH_LOADING, SET_AUTH_LOADING
} from "../actions/types"

// 初期状態
const initialState = {
  user: null,
  isAuthenticated: null,
  loading: false,
}

const authReducer = (state = initialState, action) => {
  const {type, payload} = action

  console.log(`type: ${type} state: ${state}`)

  switch (type) {
    // アカウント登録
    case REGISTER_SUCCESS:
      return {
        ...state,
      }
    case REGISTER_FAIL:
      return {
        ...state,
      }
    // ログイン
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      }
    // ユーザー情報取得
    case USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
      }
    case USER_FAIL:
      return {
        ...state,
        user: null,
      }
    // リフレッシュトークンを使いアクセストークン再発行
    case REFRESH_SUCCESS:
      return {
        ...state,
      }
    case REFRESH_FAIl:
      return {
        ...state,
        // トークン再発行失敗時は認証falseにする
        isAuthenticated: false,
        user: null,
      }
    // 認証チェック
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    // 読込中
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      }
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }

}

export default authReducer