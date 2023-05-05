import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3001";

function App() {
  const [name, setName] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = () => {
    fetch(API_BASE + "/tes")
      .then((res) => res.json())
      .then((data) => setName(data))
      .catch((error) => console.error("Error", error));
  };

  return (
    <div className="App">
      <h1>Welcome, zack</h1>
      <h1>Account List</h1>
      <div className="account">
        {name.map((name) => (
          <li key={name._id} className="name">
            Name: {name.name}
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
