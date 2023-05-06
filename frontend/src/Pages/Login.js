import React, { useState } from "react";
import Layout from "./Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <Layout>
      <div className="container">
        <div className="col-md-6">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <h1>Log in to your account</h1>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
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
                    className="form-check-input"
                    id="showPassword"
                  />
                  <label className="form-check-label" htmlFor="showPassword">
                    Show Password
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
