import mongoose from 'mongoose';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD ? encodeURIComponent(process.env.DB_PASSWORD) : undefined;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const uri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('We are connected to MongoDB!');
});

export default db;