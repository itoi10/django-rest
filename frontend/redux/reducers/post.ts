import {
  // 新規投稿
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,
  // 読込中
  SET_POST_LOADING,
  REMOVE_POST_LOADING,
  // 状態解除
  RESET_POST_STATUS
} from '../actions/types'

// memo
// reduxをTypeScriptで型定義するときに使えそうなライブラリ
// TypeScript FSA
// https://github.com/aikoven/typescript-fsa


interface State {
  loading: boolean
  new_post_success: boolean
}

// 初期値
const initialState: State = {
  loading: false,
  new_post_success: false,
}

const postReducer = (state:State = initialState, action) => {
  const { type, payload } = action

  switch ( type ) {
    // 新規作成
    case NEW_POST_SUCCESS:
      return {
        ...state,
        new_post_success: true, // 投稿成功フラグ
      } as State
    case NEW_POST_FAIL:
      return {
        ...state,
      } as State
    // 読込中
    case SET_POST_LOADING:
      return {
        ...state,
        loading: true,
      } as State
    case REMOVE_POST_LOADING:
      return {
        ...state,
        loading: false,
      } as State
    // 状態解除
    case RESET_POST_STATUS:
      // 初期値設定
      return {
        ...state,
        new_post_success: false,
      } as State
    }

}

export default postReducer