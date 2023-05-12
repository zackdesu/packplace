import React from "react";
import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then(res => res.json())

interface IProps {
  find: string;
}

const Result = ({ find }: IProps) => {
  const { data, error, isLoading } = useSWR(
    find ? `https://api.github.com/search/users?q=${find}` : null,
    fetcher
  );

  if (!find) return <div style={{ marginTop: "10px" }}>Input harus diisi.</div>;

  return (
    <div style={{ marginTop: "10px" }}>
      <p>
        Hasil: {find}
      </p>
      <div>
        {error && "Error!"}
        {isLoading && "Loading..."}
        {data?.items && (
          <ul>
            {data.items.map((user: any) => (
              <li key={user.id}>{user.login}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Result;
