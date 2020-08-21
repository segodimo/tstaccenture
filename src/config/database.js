const mongoose = require('mongoose');

module.exports = (app) => {

	const URI = process.env.MONGODB_URI;

	mongoose.connect(URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	});

	const connection = mongoose.connection;

	connection.once('open', () => {
		console.log('((DB Conetado))');
	});
};

