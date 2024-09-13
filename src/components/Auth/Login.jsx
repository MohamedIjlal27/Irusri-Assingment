import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { setToast } from '../../redux/toastSlice';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const users = useSelector((state) => state.auth.users);

  const validate = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const user = users.find((user) => user.email === email);
    if (!user) {
      dispatch(setToast({ message: 'User not found', type: 'error' }));
      return;
    }

    if (user.password !== password) {
      dispatch(setToast({ message: 'Incorrect username or password', type: 'error' }));
      return;
    }

    dispatch(login({ email, password }));
  };

  if (isAuthenticated) {
    navigate('/home');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <div className="mb-4 relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 pl-10 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4 relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 pl-10 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4">Login</button>
        <p className="text-center">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
