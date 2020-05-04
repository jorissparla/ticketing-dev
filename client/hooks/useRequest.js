// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      setErrors(
        <div className="bg-red-100 rounded border-xl shadow-xl text-red-700 my-2 py-4 px-2 text-sm font-semibold">
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
