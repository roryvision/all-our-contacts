'use client'

import { FC, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: {
    groupId: string,
  }
}

interface FormData {
  first: string;
  last?: string | null;
  phone: string;
  groupId: string;
}

const Page: FC<PageProps> = ({ params }) => {
  const { groupId } = params;
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch(`/api/groups/${groupId}/contacts`, {
      method: 'POST',
      body: JSON.stringify({
        first: formData.get('first'),
        last: formData.get('last'),
        phone: formData.get('phone'),
      } as FormData)
    })

    if (response.ok) {
      router.push(`/${groupId}/download`);
    }
  }

  const handleGoToDownload = () => {
    router.push(`/${groupId}/download`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="contact-first">First name*</label>
        <input type="text" name="first" id='contact-first' />
        <label htmlFor="contact-last">Last name</label>
        <input type="text" name="last" id='contact-last' />
        <label htmlFor="contact-phone">Phone*</label>
        <input type="text" name="phone" id='contact-phone' />
        <button type='submit'>Create</button>
        <a onClick={handleGoToDownload}>I just want to download</a>
      </form>
    </div>  
  )
}

export default Page;
