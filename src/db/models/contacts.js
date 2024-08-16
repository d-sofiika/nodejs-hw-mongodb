import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  isFavourite: {
    type: Boolean,
    default: false
  },
  contactType: {
    type: String,
    enum: ['work', 'home', 'personal'],
    default: 'personal',
    required: true
  }
}, {
  timestamps: true 
});

const contactPatch = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  isFavourite: {
    type: Boolean,
    default: false
  },
  contactType: {
    type: String,
    enum: ['work', 'home', 'personal'],
    default: 'personal',
    required: false
  }
}, {
  timestamps: true 
});

export const Contact = mongoose.model('contact', contactSchema);
export const ContactPatch = mongoose.model('contact', contactPatch);

