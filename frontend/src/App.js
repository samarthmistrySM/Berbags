import React, { useContext } from 'react';
import Login from './pages/Login'
import { Toaster } from "react-hot-toast";
import AuthContext from './context/AuthContext';

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="App">
      <Toaster />
      {isAuthenticated()?(
        <p>User Logged</p>
      ):(
        <Login/>
      )}
    </div>
  );
}

export default App;
