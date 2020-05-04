import React, { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

const Signout = () => {
  const { doRequest, errors } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });

  useEffect(() => {
    setTimeout(() => {
      doRequest();
    }, 1000);
  }, []);
  return <div>signin out....</div>;
};

export default Signout;
