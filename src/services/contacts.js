import { Contact } from '../db/models/contacts.js'
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllContacts = async ({ page, perPage, sortBy, sortOrder}) => {
 const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsCount = await Contact.countDocuments();

  const contacts = await Contact.find().sort({[sortBy]: sortOrder}).skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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

  const updatedContact = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true, 
    runValidators: true, 
  });

  return updatedContact;
};
export const deleteContact = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);
  return result;
};

