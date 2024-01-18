'use client'

import { FormEvent } from 'react';

interface FormData {
  id: string;
  name: string;
  password: string;
}

const Page = () => {
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

    const groupId: string = generateId();

    const response = await fetch('/api/groups', {
      method: 'POST',
      body: JSON.stringify({
        id: groupId,
        name: formData.get('name'),
        password: formData.get('password'),
      } as FormData)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="group-name">Group Name</label>
        <input type="text" name="name" id='group-name' />
        <label htmlFor="group-pw">Password</label>
        <input type="text" name="password" id='group-pw' />
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default Page;
