'use client'

import { signIn } from 'next-auth/react';
import { FC, FormEvent } from 'react';

interface PageProps {
  params: {
    groupId: string,
  }
}

const Page: FC<PageProps> = ({ params }) => {
  const { groupId } = params;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      id: formData.get('id'),
      password: formData.get('password'),
      callbackUrl: `/${formData.get('id')}/add`,
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='group-id'>Group ID</label>
        <input type='text' name='id' id='group-id' defaultValue={groupId} />
        <label htmlFor='group-pw'>Password</label>
        <input type='text' name='password' id='group-pw' />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default Page;
