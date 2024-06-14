import mongoose from 'mongoose';

const uri = process.env.DB_URL;

if (!uri) {
    console.error('DB_URL not found in .env');
    process.exit(1);
}

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('We are connected to MongoDB!');
});

export default db;