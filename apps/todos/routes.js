var db = require('mongoose'),
  Todo = db.model('Todo');

module.exports = (function (app) {
  app.route('/todos')
    .post(function (req, res) {
      var todo = new Todo();
      todo.title = req.body.title;
      todo.save(function (e) {
        if (e)
          res.status(500).send(e);
      }).then(function () {
        res.send(todo);
      });
    })
    .get(function (req, res) {
      Todo.find({}, null, { sort: { _id: -1 } }, function (e, data) {
        if (e) {
          res.status(500).send(e);
          return;
        }
        res.send(data);
      });
    });

  app.route('/todos/:id')
    .get(function (req, res) {
      Todo.findOne({ '_id': req.params.id }, function (e, data) {
        if (e) {
          res.status(500).send(e);
          return;
        }
        if (!data) {
          res.sendStatus(404);
          return;
        }
        res.send(data);
      });
    })
    .put(function (req, res) {
      Todo.findOne({ '_id': req.params.id }, function (e, data) {
        if (e) {
          res.status(500).send(e);
          return;
        }
        if (!data) {
          res.sendStatus(404);
          return;
        }

        data.title = req.body.title || data.title;
        data.done = req.body.done || data.done;

        data.save(function (error) {
          if (error) {
            res.status(500).send(error);
          }
        }).then(function () {
          res.send(data);
        });
      });
    })
    .delete(function (req, res) {
      Todo.findOne({ '_id': req.params.id }, function (e, data) {
        if (e) {
          res.status(500).send(e);
        }
        if (!data) {
          res.sendStatus(404);
          return;
        }
        data.remove(function (error) {
          if (error) {
            res.status(500).send(error);
            return;
          }
          res.sendStatus(200);
        });
      });
    });
});
