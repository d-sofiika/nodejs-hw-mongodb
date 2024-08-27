import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } = process.env;
export const initMongoConnection = async () => {
    try {
        const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;
        
        await mongoose.connect(uri);

        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}