'use client'

import { signIn } from 'next-auth/react';
import { FC, FormEvent } from 'react';

interface SearchProps {
  groupId: string
}

const Search: FC<SearchProps> = ({ groupId }) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await signIn('credentials', {
      id: formData.get('id'),
      password: formData.get('password'),
      callbackUrl: `/${formData.get('id')}/add`,
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className='text-3xl font-normal mb-4 w-40'>Let's find your group</h2>
        <label htmlFor='group-id' className='font-jetbrains text-sm'>Group ID</label>
        <input type='text' name='id' id='group-id' 
          placeholder='8-Digit ID'
          defaultValue={groupId}
          className='appearance-none border rounded w-full py-2 px-3 mb-2 font-jetbrains text-gray-700 placeholder-gray-400 leading-tight focus:outline-none focus:shadow-outline' />
        <label htmlFor='group-pw' className='font-jetbrains text-sm'>Password</label>
        <input type='text' name='password' id='group-pw'
          placeholder='***********'
          className='appearance-none border rounded w-full py-2 px-3 font-jetbrains text-gray-700 placeholder-gray-400 leading-tight focus:outline-none focus:shadow-outline' />
        <button type='submit' className='bg-sapphire text-white block m-auto rounded-full w-full py-2 mt-4'>Search</button>
      </form>
    </div>
  )
}

export default Search;
