import React, { useState } from "react";
import axios from "axios";
import useRequest from "../../hooks/useRequest";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };
  return (
    <div className="font-sans text-lg  bg-gray-200 min-h-screen flex items-center mb-10 flex-col w-full">
      <div className="pt-10 h-screen ">
        <div className="w-96 mx-auto rounded shadow-lg pb-5 px-8 flex items-center flex-col justify-center bg-white">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-bold">Signup Form</h1>
            <div>
              <label className="block">
                <span className="text-gray-700">Email</span>
                <input className="form-input mt-1 block w-full" placeholder="Jane Doe" onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="block">
                <span className="text-gray-700">Password</span>
                <input onChange={(e) => setPassword(e.target.value)} className="form-input mt-1 block w-full" placeholder="*****" type="password" />
              </label>
            </div>
            {errors}
            <button className="mt-8 rounded px-4  py-3  font-bold   leading-tight shadow-md bg-teal-300 hover:bg-teal-400 text-teal-800">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
