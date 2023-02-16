import './App.css';
import { LoginPage } from './LoginPage';
import RegisterPage from './RegisterPage';
import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { ProtectedPage } from './ProtectedPage';



const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    alert("not authenticated");
    return
  }
  return <>{children}</>;
};


function App() {
    return <>
      <p>Beta Version!</p>
      <LoginPage />
      <RegisterPage />

      <GuestGuard>
        <ProtectedPage />
      </GuestGuard>
    </>
}

export default App;