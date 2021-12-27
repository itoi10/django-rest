import React from "react";
import Head from "next/head";

interface Props {
}

const Layout:React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="max-w-7xl mx-auto px-8 py-6">{props.children}</div>
    </>
  );
};

export default Layout