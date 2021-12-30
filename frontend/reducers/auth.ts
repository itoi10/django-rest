import { REGISTER_FAIL, REGISTER_SUCCESS, REMOVE_AUTH_LOADING, SET_AUTH_LOADING } from "../actions/types"

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