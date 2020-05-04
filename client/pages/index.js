import React from "react";
import axios from "axios";
import buildClient from "../api/build-client";
import Link from "next/link";

const Index = ({ currentUser = null }) => {
  return (
    <div>
      {!currentUser ? (
        <div>
          <h1 className="text-red-600 bg-red-200 rounded px-2 py-2 font-semibold text-2xl">You are not signed in</h1>
          <div className="flex items-center mt-10 justify-between">
            <div className="flex items-center  justify-between">
              <Link href="/auth/signin">
                <a className="mx-4 rounded px-4  py-3  font-bold   leading-tight shadow-md bg-teal-300 hover:bg-teal-400 text-teal-800">Sign In</a>
              </Link>
              <Link href="/auth/signup">
                <a className="mx-4 rounded px-4  py-3  font-bold   leading-tight shadow-md bg-blue-300 hover:bg-blue-400 text-blue-800">Sign Up</a>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-teal-600 font-semibold text-2xl">Landing Page1 for {currentUser?.email}</h1>
      )}
    </div>
  );
};

// export async function getServerSideProps(context) {
//   // @ts-ignore
//   console.log("Landing Page");
//   const client = buildClient(context);
//   const { data } = await client.get("/api/users/currentuser");
//   return {
//     props: {
//       currentUser: data.currentUser || null,
//     },
//   };
// }

Index.getInitialProps = async (context) => {
  // @ts-ignore
  console.log("Landing Page");
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return {
    ...data,
  };
};

export default Index;
