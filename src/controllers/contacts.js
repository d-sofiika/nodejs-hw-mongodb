import * as fs from "node:fs/promises";
import path from "node:path"
import createError from 'http-errors';
import {
  getAllContacts,
  getContactsById,
  createContact,
  updateContact,
  deleteContact
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js"


export const getAllContactsController = async (req, res, next) => {
    const { _id: userId } = req.user; 
  const { page, perPage } = parsePaginationParams(req.query);
  const {sortBy, sortOrder} = parseSortParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,sortBy, sortOrder,  userId
  })
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  const contactId = req.params.contactId;
    const { _id: userId } = req.user;
  const contact = await getContactsById(contactId, userId);

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
  let photo = null;
  
  if (typeof req.file !== "undefined") {
    if (process.env.ENABLE_CLOUDINARY === "true") {
      const result = await uploadToCloudinary(req.file.path)
      await fs.unlink(req.file.path);

      photo = result.secure_url;
    
    } else {
      fs.rename(req.file.path, path.resolve("src", "public/avatars", req.file.filename))
  
      photo = `http://localhost:3000/avatars/${req.file.filename}`
    }
    
  }
  
  
  
  const { _id: userId } = req.user;
  const contact = await createContact({...req.body, userId, photo} );
  res.status(201).json({
    status: 201,
    message: 'Contact successfully created!',
    data: contact,
  });
};

export const patchContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  let photo = null;
  if (req.file) {

    if (process.env.ENABLE_CLOUDINARY === "true") {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path); 
      photo = result.secure_url;
    } else {
     
      const localPhotoPath = path.resolve("src", "public/avatars", req.file.filename);
      await fs.rename(req.file.path, localPhotoPath);
      photo = `http://localhost:3000/avatars/${req.file.filename}`;
    }

    req.body.photo = photo;
  }
  const result = await updateContact(contactId, req.body, userId);

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
  const { _id: userId } = req.user;
  
  const result = await deleteContact(contactId,userId);

  if (!result) {
    return next(createError(404, 'Contact not found'));
  }

  res.status(204).json({
    status: 204
  });
};


