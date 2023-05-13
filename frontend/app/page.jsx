import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container mx-auto">
      <Link href="/login" className="text-blue-700">
        Log in
      </Link>{" "}
      to continue
    </div>
  );
};

export default Page;
