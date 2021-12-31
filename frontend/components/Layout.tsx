import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh } from '../actions/auth'
import Head from "next/head";
import Navigation from './Navigation'

interface Props {
}

const Layout:React.FC<Props> = (props) => {
  const dispatch = useDispatch()

  // ブラウザ更新時にリフレッシュ実行し,アクセストークン再発行
  useEffect(() => {
    (async () => {
      if (dispatch && dispatch !== null && dispatch !== undefined) {
        await dispatch(refresh())
      }
    })()
  }, [dispatch])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navigation />
      <div className="max-w-7xl mx-auto px-8 py-6">{props.children}</div>
    </>
  );
};

export default Layout