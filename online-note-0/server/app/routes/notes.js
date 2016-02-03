var constants = require("../constants");
var ObjectID = require('mongodb').ObjectID;

var notes = {
 
  getAll: function(req, res) {
    var userId = req.headers['user-id'];
    var collection = req.db.collection(constants.NOTES);
    collection.find({userId: ObjectID(userId)}, { body: 0 }).toArray(function (err, notes) {
      if (notes && notes.length) {
        res.status(200);
        res.send(notes);
      } else {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Invalid user id"
        });
      }
    });
  },
 
  getOne: function(req, res) {
    var id = req.params['id'];
    var collection = req.db.collection(constants.NOTES);
    collection.findOne({_id: ObjectID(id)}, function (err, note) {
      if (note) {
        res.status(200);
        res.send(note);
      } else {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Invalid note id"
        });
      }
    });
  },
 
  create: function(req, res) {
    res.send('Create');
  },
 
  update: function(req, res) {
    res.send('Update');
  },
 
  delete: function(req, res) {
    res.send('Delete');
  }
};
 
module.exports = notes;
