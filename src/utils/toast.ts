import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showToastError = (message: string) =>
  toast.error(message, {
    position: 'top-center',
  });

export { showToastError };