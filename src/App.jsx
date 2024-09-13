import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Toast from './components/Toast/Toast';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toast />
    </>
  );
}

export default App;