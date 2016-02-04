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
    console.log(req.body.title);
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
    res.send('Update');
  },
 
  delete: function(req, res) {
    res.send('Delete');
  }
};

validateNote = function (note) {
  // Implement userId validation later
  return Boolean(note.title);
}

module.exports = notes;
