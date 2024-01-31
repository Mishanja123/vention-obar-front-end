import s3axiosInstance from '@/services/s3axiosInstance';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface IFn {
  file: FormData;
  userId?: number | null;
}

const useMutation = ({ url }: { url: string }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
  });

  const fn = async ({ file, userId = null }: IFn) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      console.log(file);
      const response = await s3axiosInstance.post(url, file, {
        headers: { 'x-user-id': userId },
      });
      console.log(response);
      setState({ isLoading: false, error: '' });
      Swal.fire({
        title: 'Success!',
        text: "You've updated your profile picture.",
        icon: 'success',
      });
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      setState({ isLoading: false, error });
    }
  };
  return { mutate: fn, ...state };
};

export default useMutation;
