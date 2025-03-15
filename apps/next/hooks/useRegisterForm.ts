import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
// @ts-ignore
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormDataRegister } from '@/types';
import { useAuth } from '@/context/User';

const registerSchema = yup.object().shape({
  email: yup.string().email('Enter a valid e-mail address').required('Enter your e-mail address'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Enter your password'),
  firstName: yup.string().required('Enter your first name'),
  lastName: yup.string().required('Enter your last name'),
  acceptPrivacy: yup.boolean().required('You must accept the privacy policy')
});

const useRegisterForm = () => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSucess, setIsSuccess] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataRegister>({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data: FormDataRegister) => {
    setIsLoading(true);
    try {
      const { acceptPrivacy, ...rest } = data;
      const response = await signUp({ ...rest });
      if (response.status === 'OK') {
        setGlobalError('');
        setIsLoading(false);
        router.push('/login');
        return setIsSuccess(true);
      } else {
        setGlobalError(response.message);
        setIsLoading(false);
        return setIsSuccess(false);
      }
    } catch (err: unknown) {
      setGlobalError('An error occurred while registering user');
      setIsLoading(false);
      return setIsSuccess(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    globalError,
    onSubmit,
    isLoading,
    isSucess
  };
};

export default useRegisterForm;
