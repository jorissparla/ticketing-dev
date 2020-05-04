import React from "react";
import App from "next/app";
import "../styles/index.css";
import Header from "../components/Header";
import buildClient from "../api/build-client";

const MyApp = (props) => {
  const { Component, pageProps, currentUser } = props;
  return (
    <div>
      <Header currentUser={currentUser}></Header>
      <Component {...pageProps} />
    </div>
  );
};
MyApp.getInitialProps = async (appContext) => {
  // console.log("Component", appContext);
  // @ts-ignore
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  console.log("pageProps _app", pageProps);
  return {
    pageProps,
    ...data,
  };
};
export default MyApp;
