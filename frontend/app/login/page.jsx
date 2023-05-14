"use client";

import React, { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleShow = (e) => {
    setShow(e.target.checked);
  };

  useEffect(() => {
    console.log(show);
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const acc = {
      email,
      password,
    };
    await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify(acc),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result) {
          alert(`Selamat datang ${res.user.name}`);
        } else {
          alert(res.message);
        }
      });
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col">
          <form onSubmit={handleSubmit}>
            <h1 className="text-3xl font-semibold mb-5">
              Log in to your account
            </h1>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-slate-700 text-lg font-medium"
              >
                Email
              </label>
              <input
                type="email"
                className="mt-1 block w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              invalid:border-pink-500 invalid:text-pink-600
              focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                id="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="block text-slate-700 text-lg font-medium"
              >
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                className="mt-1 block w-1/2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                id="password"
                name="password"
                minLength={6}
                maxLength={20}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="mb-3">
                <input
                  type="checkbox"
                  id="showPassword"
                  onClick={(e) => handleShow(e)}
                />
                <label className="checkpassword" htmlFor="showPassword">
                  Show Password
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-1 px-3 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
