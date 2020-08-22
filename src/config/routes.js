module.exports = (app) => {
  app.route('/users')
  .get(app.routes.users.findAll)
  .post(app.routes.users.create)

  app.route('/contas')
  .get(app.routes.contas.getAll)
  .post(app.routes.contas.create)


  app.route('/contas/:id')
  .get(app.routes.contas.get)
}
