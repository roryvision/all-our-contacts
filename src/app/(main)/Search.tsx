'use client'

import { signIn } from 'next-auth/react';
import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { showToastError } from '@/utils/toast';
import Button from '@/components/Button';
import InputField from '@/components/InputField';

interface SearchProps {
  groupId: string
}

interface FormData {
  id: string;
  password: string;
}

const Search: FC<SearchProps> = ({ groupId }) => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (groupId === 'search') {
    groupId = ''
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const formId: string | null = formData.get('id') as string;
    const formPassword: string | null = formData.get('password') as string;

    if (!formId || !formPassword) {
      setErrors({
        formId: !formId ? 'Please enter an 8-digit ID' : '',
        formPassword: !formPassword ? 'Please enter a password' : '',
      })
      return;
    }

    try {
      const response = await signIn('credentials', {
        id: formId,
        password: formPassword,
        callbackUrl: `/${formData.get('id')}/add`,
        redirect: false,
      })

      if (response && response.status === 401) {
        showToastError("Group could not be found with the provided credentials.");
      } else if (response && response.ok) {
        groupId = formId;
        router.push(`/${groupId}/add`);
      }
    } catch(error) {
      showToastError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2 className='text-3xl font-normal mb-4 w-40'>Let's find your group</h2>
        <InputField
          label='Group ID'
          name='id'
          type='text'
          placeholder='8-Digit ID'
          defaultValue={groupId !== 'search' ? groupId : undefined}
          maxLength={8}
          hasError={!!errors.formId} />
        {errors.formId && <p className='text-xs text-red-500 mb-2'>{errors.formId}</p>}
        <InputField
          label='Password'
          name='password'
          type='password'
          placeholder='***********'
          hasError={!!errors.formPassword} />
        {errors.formPassword && <p className='text-xs text-red-500 mb-2'>{errors.formPassword}</p>}
        <Button className='py-2 mt-4' isLoading={false}>Search</Button>
        <a href='/create' className='font-jetbrains text-xs underline text-center block mt-2 opacity-80'>Create a group</a>
      </form>
    </div>
  )
}

export default Search;
