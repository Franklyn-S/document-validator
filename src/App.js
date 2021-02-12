import React, { useEffect, useState } from "react";
import Routes from "./Routes.js";
import "./App.css";
import Header from "./components/Header/Header.js";
import UserContext from "./context/UserContext.js";

function App() {
  const [signedInUser, setSignedInUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  useEffect(() => {
    setSignedInUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);
  return (
    <UserContext.Provider value={{ signedInUser, setSignedInUser }}>
      <Header />
      <Routes />
    </UserContext.Provider>
  );
}

export default App;
