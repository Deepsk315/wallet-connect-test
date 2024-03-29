import "./assets/css/bootstrap.min.css";
import "./assets/css/style.scss";

import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import setAuthToken from "./utils/setAuthToken";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { url } from "./actions/config";
import { getProfile } from "./actions/profileActions";

const token = window.localStorage.getItem("web3_japan_token");
if (token) {
  setAuthToken(token);
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profileChanged, setProfileChanged] = useState(false);

  const getUpdatedProfile = async () => {
    if (!isLoggedIn) {
      setProfilePic(null);
      return;
    }

    try {
      const response = await getProfile();
      const profile = response?.data?.data;
      // console.log('profile', profile);
      if (profile?.profile_pic) {
        // console.log('got profile pic');
        setProfilePic(url() + profile?.profile_pic);
      } else {
        setProfilePic(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUpdatedProfile();
  }, [isLoggedIn, profileChanged]);

  return (
    <BrowserRouter>
      <Switch>
        <Layout profilePic={profilePic}>
          <Route exact path="/">
            <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route exact path="/login">
            <Redirect to="/dashboard" />
          </Route>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
