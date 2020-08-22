module.exports = (app) => {
  app.route('/users')
  .get(app.routes.users.findAll)
  .post(app.routes.users.create)

  app.route('/contas')
  .get(app.routes.contas.findAll)
  .post(app.routes.contas.create)
}
