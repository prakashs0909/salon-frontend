import React from "react";

const VerifiedMail = () => {
  return (
    <div className="flex flex-col justify-center mt-20 px-6 py-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="d-flex justify-content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-check-circle text-success"
          >
            <path d="M9 11l3 3L22 4" />
            <path d="M1 12a11 11 0 1 0 22 0A11 11 0 1 0 1 12z" />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
          Email Verified
        </h2>
        <p className="mt-2 text-center  text-gray-600">
          Your email has been successfully verified. You can now{" "}
          <a
            href="/"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
          to your account.
        </p>
      </div>
    </div>
  );
};

export default VerifiedMail;
