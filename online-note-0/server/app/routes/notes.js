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
    var note = req.body.note;
    if (!note || !validateNote(note)) {
      res.status(400);
      res.json({
        "status": 400,
        "message": "Missing field"
      });
      return;
    }

    var collection = req.db.collection(constants.NOTES);
    note.date = new Date();
    note.userId = ObjectID(note.userId);
    collection.insert(note, function (err, result) {
      if (err) {
        res.status(500);
        res.json({
          "status": 500,
          "message": "Database error, please contact site admin"
        });
      } else {
        res.status(200);
        res.json({
          "status": 200,
          "message": result
        });
      };
    })

  },
 
  update: function(req, res) {
    var note = req.body.note;
    if (!note || !validateNote(note)) {
      res.status(400);
      res.json({
        "status": 400,
        "message": "Missing field"
      });
      return;
    }

    var id = ObjectID(req.params['id']);
    var collection = req.db.collection(constants.NOTES);

    collection.update({_id: ObjectID(id)}, { $set: note }, function (err, result) {
      if (err) {
        res.status(500);
        res.json({
          "status": 500,
          "message": "Database error, please contact site admin"
        });
      } else {
        res.status(200);
        res.json({
          "status": 200,
          "message": result
        });
      };
    })
  },
 
  delete: function(req, res) {
    var id = ObjectID(req.params['id']);
    var collection = req.db.collection(constants.NOTES);

    collection.deleteOne({_id: ObjectID(id)}, function (err, result) {
      if (err) {
        res.status(500);
        res.json({
          "status": 500,
          "message": "Database error, please contact site admin"
        });
      } else {
        res.status(200);
        res.json({
          "status": 200,
          "message": result
        });
      };
    })
  }
};

validateNote = function (note, isUpdate) {
  // TODO: Should check more detail: field should/shouldn't have, check ID
  var isValid = Boolean(note.title);
  return isValid;
}

module.exports = notes;
