import { Contact } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsCount = await Contact.countDocuments({ userId });

  const contacts = await Contact.find({ userId })
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = async (contactId, userId) => {
  const contact = await Contact.findOne({_id: contactId, userId});
  return contact;
};

export const createContact = async (payload) => {
  const contacts = await Contact.create(payload);
  return contacts;
};
export const updateContact = async (contactId, payload, userId) => {
  const updatedContact = await Contact.findOneAndUpdate({_id: contactId, userId} ,payload, {
    new: true,
    runValidators: true,
  });

  return updatedContact;
};
export const deleteContact = async (contactId, userId) => {
  const result = await Contact.findOneAndDelete({_id: contactId, userId});
  return result;
};
