'use client'

import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import { showToastError } from '@/utils/toast';

interface PageProps {}

interface FormData {
  id: string;
  name: string;
  password: string;
}

const Page: FC<PageProps> = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const generateId = (): string => {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id: string = '';

    for (let i: number = 0; i < 8; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }

    return id;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name: string | null = formData.get('name') as string;
    const password: string | null = formData.get('password') as string;

    if (!name || !password) {
      setErrors({
        name: !name ? 'Please provide a name' : '',
        password: !password ? 'Please provide a password' : '',
      })
      return;
    }

    if (name.length > 32) {
      setErrors({
        ...errors,
        name: 'Cannot exceed 32 characters',
      });
      return;
    }

    const groupId: string = generateId();

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify({
          id: groupId,
          name: name,
          password: password,
        } as FormData)
      })

      if (response.ok) {
        router.push(`/${groupId}/add`);
      } else {
        showToastError("Sorry, we couldn't create your group due to an error on our end.");
      }
    } catch (error) {
      showToastError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <label htmlFor='group-name'>Group Name</label>
        <input type='text' name='name' id='group-name' maxLength={32} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        <label htmlFor='group-pw'>Password</label>
        <input type='text' name='password' id='group-pw' />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default Page;
