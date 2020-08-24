const mongoose = require('mongoose');

module.exports = (app) => {
  const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb+srv://segodimo:4xTRFiByoRLr0TkD@cluster0.pehon.mongodb.net/tstaccenture?retryWrites=true&w=majority';
    // : 'mongodb://localhost/accndb';

  mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const { connection } = mongoose;
};
