import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { auth, googleProvider } from './firebase';

const Home = () => (
  <div>
    <h2>Home Page</h2>
    <p>Welcome to the Home Page!</p>
  </div>
);

const Profile = () => (
  <div>
    <h2>Profile Page</h2>
    <p>User profile information goes here.</p>
  </div>
);

const SignIn = () => {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign In Page</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

const SignOut = () => {
  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Sign Out Page</h2>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            {user ? (
              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
            ) : (
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            )}
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signout" component={SignOut} />
      </div>
    </Router>
  );
}

export default App;
