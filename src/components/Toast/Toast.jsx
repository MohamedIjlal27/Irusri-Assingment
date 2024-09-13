import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearToast } from '../../redux/toastSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.toast);

  useEffect(() => {
    if (message) {
      toast[type](message);
      dispatch(clearToast());
    }
  }, [message, type, dispatch]);

  return <ToastContainer />;
};

export default Toast;
