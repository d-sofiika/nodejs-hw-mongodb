import { Contact, ContactPatch } from '../db/models/contacts'
export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactsById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};
export const createContact = async (payload) => {
  const contacts = await Contact.create(payload);
  return contacts
};
export const updateContact = async (contactId, payload) => {

  const updatedContact = await ContactPatch.findByIdAndUpdate(contactId, payload, {
    new: true, 
    runValidators: true, 
  });

  return updatedContact;
};
export const deleteContact = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  return result;
};