require('dotenv').config();
const app = require('./app');

console.log('OKOKOKOKOKOKOKOKOKOKOKO');
console.log(process.env.PORT,'process.env.PORT');

app.listen(process.env.PORT || 3001, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});