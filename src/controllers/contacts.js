import { getAllContacts, getContactsById } from './services/contacts.js';
import createHttpError from 'http-errors';
export const getAllContactsController = async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


export const getContactsByIdController = async (req, res) => {
    try {
        const contactId = req.params.contactId;
        const contact = await getContactsById(contactId);

        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found',
            });
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};