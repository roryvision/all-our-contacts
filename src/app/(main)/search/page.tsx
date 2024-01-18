'use client'

import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';

const Page = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      id: formData.get('id'),
      password: formData.get('password'),
      callbackUrl: `/${formData.get('id') }`,
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="group-id">Group ID</label>
        <input type="text" name="id" id='group-id' />
        <label htmlFor="group-pw">Password</label>
        <input type="text" name="password" id='group-pw' />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default Page;
