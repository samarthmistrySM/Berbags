import Login from "./pages/Login";
import AuthState from './contexts/AuthState'


function App() {
  return (
    <AuthState>
      <Login/>
    </AuthState>
  );
}

export default App;
