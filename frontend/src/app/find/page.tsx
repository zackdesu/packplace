"use client";

import React, { useEffect, useState } from "react";
import Result from "./result";

const page = () => {
  const [find, setFind] = useState("");

  const onSearch = (e: any) => {
    e.preventDefault();
    const findUser = e.target[0].value;
    if (findUser) setFind(findUser);
  };

  useEffect(() => {
    console.log(find)
  }, [find])

  return (
    <div>
      <form onSubmit={onSearch}>
        <input placeholder="User Github" />
        <button>Cari</button>
      </form>
      <Result find={find} />
    </div>
  );
};

export default page;
