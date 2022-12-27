import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/app";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2 className="blink">Welcome to myChat</h2>
        <button
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined />
          &nbsp;&nbsp; Sign in With Google
        </button>
        <button
          className="login-button facebook"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <FacebookOutlined />
          &nbsp;&nbsp; Sign in With Facebook
        </button>
      </div>
    </div>
  );
};

export default Login;
