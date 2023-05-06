import Layout from "./Layout";
import React, { useState, useEffect } from "react";
import API from "../api/API";
import { Link } from "react-router-dom";
import Info from "../Components/Info";

const Home = () => {
  const [session, setSession] = useState([]);

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    await API.get("/session")
      .then((res) => {
        setSession(res.data.session);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Layout>
      <div className="App">
        {session && <Info session={session} />}
        {!session && (
          <div className="container">
            <Link to="/login">Log in</Link> to continue
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
