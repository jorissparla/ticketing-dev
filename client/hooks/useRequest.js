// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (error) {
      setErrors(
        <div className="bg-red-100 rounded border-xl shadow-xl text-red-700 my-2 py-3 px-2 text-sm font-semibold">
          {error.response.data.errors.map((err, index) => (
            <div key={index}>
              <span>{err.message}</span>
            </div>
          ))}
        </div>
      );
    }
  };
  return { doRequest, errors };
};

export default useRequest;
