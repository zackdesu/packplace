import React from "react";
import Layout from "./Layout";

const Error404 = () => {
  return (
    <Layout>
      <div className="error">
        <h1 className="errors">Error 404</h1>
        <h1>Page Not Found!</h1>
      </div>
    </Layout>
  );
};

export default Error404;
