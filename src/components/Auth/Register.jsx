import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { setToast } from '../../redux/toastSlice';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const users = useSelector((state) => state.auth.users);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
    setErrors({});
    setPasswordValidations({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  }, [location]);

  const validate = () => {
    const errors = {};
    if (!name || name.length < 3) errors.name = 'Name must be at least 3 characters';
    if (!email || !/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      errors.password = 'Password must meet the following criteria:';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email already registered' }));
      dispatch(setToast({ message: 'Email already registered', type: 'error' }));
      return;
    }

    dispatch(register({ email, password, name }));
    dispatch(setToast({ message: 'Registration Successful', type: 'success' }));
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length >= 3) {
      setErrors((prevErrors) => ({ ...prevErrors, name: null }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name must be at least 3 characters' }));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (/\S+@\S+\.\S+/.test(e.target.value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: null }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is invalid' }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const validations = {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      specialChar: /[@$!%*?&]/.test(value),
    };

    setPasswordValidations(validations);

    if (Object.values(validations).every(Boolean)) {
      setErrors((prevErrors) => ({ ...prevErrors, password: null }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must meet the following criteria:' }));
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <div className="mb-4 relative">
          <FaUser className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            required
            className="w-full p-2 pl-10 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4 relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
            className="w-full p-2 pl-10 border border-gray-300 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4 relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
            className="w-full p-2 pl-10 border border-gray-300 rounded"
          />
          {errors.password && (
            <div className="text-red-500 text-sm">
              <p>{errors.password}</p>
              <ul className="list-disc list-inside">
                <li className={passwordValidations.length ? 'text-green-500' : 'text-red-500'}>At least 8 characters</li>
                <li className={passwordValidations.uppercase ? 'text-green-500' : 'text-red-500'}>One uppercase letter</li>
                <li className={passwordValidations.lowercase ? 'text-green-500' : 'text-red-500'}>One lowercase letter</li>
                <li className={passwordValidations.number ? 'text-green-500' : 'text-red-500'}>One number</li>
                <li className={passwordValidations.specialChar ? 'text-green-500' : 'text-red-500'}>One special character</li>
              </ul>
            </div>
          )}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-4">Register</button>
        <button type="button" onClick={handleLoginRedirect} className="w-full bg-gray-500 text-white p-2 rounded">Go to Login</button>
      </form>
    </div>
  );
}

export default Register;
