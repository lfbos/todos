var db = require('mongoose'),
    Todo = db.model('Todo');

module.exports = (function(app) {
  app.route('/todos')
    .post(function(req, res) {

    })
    .get(function(req, res) {

    });

  app.route('/todos/:id')
    .get(function(req, res) {

    })
    .put(function(req, res) {

    })
    .delete(function(req, res) {

    });
});
