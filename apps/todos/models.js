var db = require('mongoose');

var ObjectId = db.Schema.ObjectId;
var Schema = new(db.Schema)({
  title: {type: String, trim: true, required: true},
  done: {type: Boolean, default: false},
});

Schema.methods.toJSON = function() {
  return {
  };
};

Schema.statics.add = function(args, fn) {

};

Schema.statics.get = function(args, fn) {

};

Schema.statics.fetch = function(args, fn) {

};

Schema.statics.change = function(args, fn) {

};

Schema.statics.remove = function(args, fn) {

};

var Todo = db.model('Todo', Schema);
