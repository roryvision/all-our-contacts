import { FC } from 'react';
var vCardsJS = require('vcards-js');
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PageProps {
  params: {
    groupId: string;
  }
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
      toast.error("Error fetching contacts");
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
      <ToastContainer />
    </>
  )
}

export default Page;
