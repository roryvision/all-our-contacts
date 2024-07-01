'use client'

import { Button } from '@/components/ui/button';
import { createVCF } from '@/utils/actions';
import { DownloadIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

interface PageProps {
  params: {
    groupId: string;
  }
}

export default function Page({ params }: PageProps) {
  const { groupId } = params;
  var contacts : Contact[] = [];
  const [vCardData, setVCardData] = useState<string>('');

  useEffect(() => {
    (async () => {
      contacts = await getContacts(groupId);
      const vCard = await createVCF(contacts);
      setVCardData(vCard);
    })();
  }, []);

  return (
    <>
      <Button asChild>
        <a
          href={`data:text/vcard;charset=utf-8,${encodeURIComponent(vCardData)}`}
          download='contacts.vcf'
        >
          <DownloadIcon className='mr-2' /> Download
        </a>
      </Button>
    </>
  )
}

async function getContacts(groupId: String) {
  const contacts: Contact[] = [];

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/groups/${groupId}/contacts`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const res = await response.json();
      res.forEach((r: ContactResponse) => {
        contacts.push({
          FN: r.first_name,
          LN: r.last_name,
          TEL: r.phone,
        });
      });
    } else {
      throw new Error('Invalid content type in the response');
    }
  } catch (error) {
    throw error;
  }

  return contacts;
}
