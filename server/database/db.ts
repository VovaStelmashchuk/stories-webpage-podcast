import mongoose from 'mongoose';

const config = useRuntimeConfig()

const uri = config.dbUrl;

if (!uri) {
    console.error('DB_URL not found in .env');
    process.exit(1);
}

console.log('Connecting to MongoDB... with URI:', uri);

mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('We are connected to MongoDB!');
});

export default db;