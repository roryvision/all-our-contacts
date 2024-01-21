import { FC } from 'react';
var vCardsJS = require('vcards-js');

interface PageProps {
  params: {
    groupId: string;
  }
}

interface Contact {
  FN : string,
  LN : string,
  TEL : number,
}

interface ContactResponse {
  id: number,
  created_at: string,
  first_name: string,
  last_name: string,
  phone: number,
  group_id: string,
}

const Page: FC<PageProps> = async ({ params }) => {
  const { groupId } = params;
  var vContact;
  var vCardData = '';
  var contacts : Contact[] = [];

  const getContacts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/groups/${groupId}/contacts`, {
        method: 'GET',
        cache: 'no-store',
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
      console.error('Error fetching contacts:', error);
      // Handle the error, show a message to the user, or perform other appropriate actions.
    }
  };

  await getContacts();

  contacts.forEach((contact) => {
    vContact = vCardsJS();
    vContact.firstName = contact.FN;
    vContact.lastName = contact.LN;
    vContact.cellPhone = contact.TEL;
    vCardData += vContact.getFormattedString();
  })

  return (
    <>
      <a
        href={`data:text/vcard;charset=utf-8,${encodeURIComponent(vCardData)}`}
        download='contacts.vcf'
      >
        Download Contacts
      </a>
    </>
  )
}

export default Page;
