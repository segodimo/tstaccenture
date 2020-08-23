require('dotenv').config();
const app = require('express')();
const consign = require('consign');

consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./config/database.js')
  .then('./services')
  .then('./routes')
  .then('./config/routes.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});  

app.use((err, req, res, next) => {
	const { name, message, stack } = err;
	// console.log(message,'okokok message')
	if( name == 'ValidationError') res.status(400).json({ error: message });
	// if( name == ValidationError) res.status(404).json({ "mensagem": "mensagem de erro" })
	// else res.status(500).json({ "mensagem": "mensagem de erro" })
	else res.status(400).json({ name, message, stack });
	next(err);
});  

// app.use((err, req, res, next) => {
//   const { name, message, stack } = err;
//   if (name === 'ValidationError') res.status(400).json({ error: message });
//   else if (name === 'RecursoIndevidoError') res.status(403).json({ error: message });
//   else {
//     const id = uuid();
//     // console.log(message);
//     app.log.error({ id, name, message, stack });
//     res.status(500).json({ id, error: 'Falha interna' });
//   }
//   next(err);
// });


module.exports = app;
