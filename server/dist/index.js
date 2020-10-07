"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const linksRouter_1 = __importDefault(require("./linksRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
process.on('uncaughtException', (err) => {
    console.log('UNCAUGH EXCEPTION! SHUTTING DOWN......');
    console.log(err.name, err.message);
    process.exit(1);
});
dotenv_1.default.config({ path: './.env' });
typeorm_1.createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
    },
    entities: ['./dist/*.js'],
})
    .then((conn) => {
    const app = express_1.default();
    app.use(cors_1.default());
    app.options('*', cors_1.default());
    app.use(express_1.default.json());
    app.use('/api/v1/links/', linksRouter_1.default);
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
        console.log(`App running on http://127.0.0.1:${port}`);
    });
    process.on('unhandledRejection', (err) => {
        console.log('UNHANDLER REJECTION! SHUTTING DOWN......');
        console.log(err.name, err.message);
        server.close(() => {
            process.exit(1);
        });
    });
    process.on('SIGTERM', () => {
        console.log('SIGTERM RECEIVED. Shutting down gracefully');
        server.close(() => {
            console.log('Process terminated!');
        });
    });
})
    .catch((e) => console.log(e));
