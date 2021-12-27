import React, { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ThunkMiddleware from 'redux-thunk'
import reducers from './reducers'

let store

const initStore = (initialState) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(ThunkMiddleware))
  )
}

export const initializeStore = (preloadedState) => {
  // ?? Null合体演算子 左辺がnullまたはundefinedの時は右辺を返す
  let _store = store ?? initStore(preloadedState)

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = undefined
  }

  if (typeof window === 'undefined') {
    return _store
  }

  if (!store) {
    store = _store
  }

  return _store
}

export const useStore = (initialState) => {
  const store = useMemo(() => {
    initializeStore(initialState)
  }, [initialState])

  return store
}