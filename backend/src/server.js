require('dotenv').config();
const app = require('./app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function start() {
    let connected = false;
    while (!connected) {
        try {
            await prisma.$connect();
            console.log('PostgreSQL connecté via Prisma');
            connected = true;
        } catch (err) {
            console.error('DNS non joignable (db:5432) ou DB non prête, nouvelle tentative dans 2s...');
            await wait(2000);
        }
    }
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
}

start();