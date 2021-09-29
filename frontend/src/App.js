import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import ProfilePage from "./components/ProfilePage";
import EditProfilePage from "./components/EditProfile";
import AllUsers from "./components/AllUsers";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} exact></Route>
      <Route path="/signin" component={SignIn} exact></Route>
      <Route path="/signup" component={SignUp} exact></Route>
      <Route path="/myProfile" component={ProfilePage} exact></Route>
      <Route path="/editProfile" component={EditProfilePage} exact></Route>
      <Route path="/admin/getAllUsers" component={AllUsers} exact></Route>
    </BrowserRouter>
  );
}

export default App;
