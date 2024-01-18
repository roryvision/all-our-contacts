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
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/groups/${groupId}/contacts`, {
      method: 'GET',
      cache: 'no-store',
    })

    const res = await response.json();
    res.forEach((r: ContactResponse) => {
      contacts.push({
        FN: r.first_name,
        LN: r.last_name,
        TEL: r.phone,
      });
    })
  }

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
