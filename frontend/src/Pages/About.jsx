import React from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const About = () => {
  return (
    <Layout>
      <div>
        <Link to="/login">Log in</Link> to continue
      </div>
    </Layout>
  );
};

export default About;
