const mongoose = require('mongoose');

module.exports = (app) => {
  const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/dbaccenture';

  mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const { connection } = mongoose;

  // connection.once('open', () => {
  // 	console.log('>> DATABASE IS CONNECTED');
  // });
};
