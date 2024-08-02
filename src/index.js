import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";

const startServer = async () => {
    await initMongoConnection(); // Підключення до MongoDB
    setupServer(); // Запуск сервера
};

startServer();