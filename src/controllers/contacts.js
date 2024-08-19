
import createError from 'http-errors';
import {
  getAllContacts,
  getContactsById,
  createContact,
  updateContact,
  deleteContact
} from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactsById(contactId);

  if (!contact) {
    return next(createError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Contact successfully created!',
    data: contact,
  });
};

export const patchContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    return next(createError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await deleteContact(contactId);

  if (!result) {
    return next(createError(404, 'Contact not found'));
  }

  res.status(204).json({
    status: 204
  });
};