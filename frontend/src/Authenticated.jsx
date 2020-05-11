import React, { useState } from 'react';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import { useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyBSTSF4U8QihHHd2zwsT2f5MVv7m9rM3mk",
    authDomain: "web-dev-final-3d037.firebaseapp.com",
    databaseURL: "https://web-dev-final-3d037.firebaseio.com",
    projectId: "web-dev-final-3d037",
    storageBucket: "web-dev-final-3d037.appspot.com",
    messagingSenderId: "1006598584113",
    appId: "1:1006598584113:web:9ea331d930df312a2de210",
    measurementId: "G-N52BS914EC"
};

firebase.initializeApp(firebaseConfig);

export default (props) => {
    const [user, setUser] = useState(null);
  
    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };
  
    function onAuthStateChange() {
      return firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
      });
    }
  
    useEffect(() => onAuthStateChange(), []);
  
    return (
      <div>
        {user && props.children}
        {!user && (
          <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        )}
      </div>
    );
  };