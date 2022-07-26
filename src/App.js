import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "./App.css";
import JoblyApi from "./api";
import jwt from "jsonwebtoken";
import UserContext from "./auth/UserContext";
import useLocalStorage from "./hooks/useLocalStorage";

const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ applicationsIds, setApplicationsId ] = useState(new Set([]));
  const [ token, setToken ] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            const { username } = jwt.decode(token);
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getCurrentUser(username);
            console.log(currentUser);
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
      let token = await JoblyApi.login(formData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Failed", errors);
      return { success: false, errors };
    }
  }

  async function signup(formData) {
    try {
      let token = await JoblyApi.signup(formData);
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

  function hasAppliedToJob(id) {
    return applicationsIds.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationsId(new Set([ ...applicationsIds, id ]));
  }

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
      >
        <div className="App">
          <Navbar logout={logout} />
          <Routes signup={signup} login={login} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
