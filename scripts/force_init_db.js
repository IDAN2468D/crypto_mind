require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

async function init() {
    console.log('--- Database Initialization Script ---');

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('Error: MONGODB_URI is missing in .env');
        process.exit(1);
    }

    console.log('Connection String configured (ending with): ...' + uri.slice(-20));
    console.log('Attempting connection...');

    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB Atlas successfully!');

        // Create a temporary collection/document to force DB creation
        const collectionName = 'init_test_' + Date.now();
        console.log(`Creating temporary collection '${collectionName}' to force DB creation...`);

        await mongoose.connection.db.createCollection(collectionName);
        await mongoose.connection.db.collection(collectionName).insertOne({
            message: 'Hello CryptoMind! This document ensures the DB is visible.',
            createdAt: new Date()
        });

        console.log('✅ Data written successfully!');
        console.log('The database "CryptoMind" should now be visible in MongoDB Compass.');
        console.log('Please click the "Refresh" button (circular arrow) in Compass sidebar.');

        // Clean up
        await mongoose.connection.db.collection(collectionName).drop();
        console.log('Temporary collection cleaned up.');

    } catch (err) {
        console.error('❌ Connection Failed:', err.message);
        if (err.message.includes('bad auth')) {
            console.error('Hint: Check your username and password in MONGODB_URI.');
        }
        if (err.message.includes('whitelist')) {
            console.error('Hint: Ensure your IP address is whitelisted in MongoDB Atlas Network Access.');
        }
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

init();
