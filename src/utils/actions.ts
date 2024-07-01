'use server'

var vCardsJS = require('vcards-js');

export async function createVCF(contacts: Contact[]) {
  var vContact;
  var vCardData = '';

  contacts.forEach((contact) => {
    vContact = vCardsJS();
    vContact.firstName = contact.FN;
    vContact.lastName = contact.LN;
    vContact.cellPhone = contact.TEL;
    vCardData += vContact.getFormattedString();
  });

  return vCardData;
}