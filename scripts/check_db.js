require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

async function check() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('No MONGODB_URI found in .env');
        return;
    }
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(uri);
        console.log('Connected successfully!');

        const admin = new mongoose.mongo.Admin(mongoose.connection.db);
        const dbs = await admin.listDatabases();
        console.log('Available Databases:');
        dbs.databases.forEach(db => console.log(' - ' + db.name));

        const currentDb = mongoose.connection.db.databaseName;
        console.log(`Current Target Configured DB: ${currentDb}`);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Collections in ' + currentDb + ':');
        if (collections.length === 0) {
            console.log(' (No collections found - DB might not be visible in Compass yet)');
        } else {
            collections.forEach(c => console.log(' - ' + c.name));
        }

    } catch (err) {
        console.error('Connection failed:', err);
    } finally {
        await mongoose.disconnect();
    }
}

check();
