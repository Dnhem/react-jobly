import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "./App.css";
import JoblyApi from "./api";
import jwt from "jsonwebtoken";
import UserContext from "./auth/UserContext";

function App() {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ token, setToken ] = useState(null);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            const { username } = jwt.decode(token);
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getCurrentUser(username);
            setCurrentUser(currentUser);
          } catch (errors) {
            console.log(errors);
          }
        }
      }
      getCurrentUser();
    },
    [ token ]
  );

  async function login(formData) {
    try {
      const token = await JoblyApi.login(formData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Failed", errors);
      return { success: false, errors };
    }
  }

  async function signup(formData) {
    try {
      const token = await JoblyApi.signup(formData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navbar logout={logout} />
          <Routes signup={signup} login={login} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
