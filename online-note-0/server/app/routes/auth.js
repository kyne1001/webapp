var jwt = require('jwt-simple');
var constants = require("../constants");

var auth = {
  login: function(req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';
    var collection = req.db.collection(constants.USERS);
    
    if (username === '' || password === '') {
      res.status(401);
      res.json({
        "status": 404,
        "message": "Invalid credentials"
      });
      return;
    }

    var promise = auth.validate(username, password, collection);
    promise.then(function success(doc) {
      res.status(200);
      res.json(genToken(doc));
    }).catch(function error(err) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
    });
  },

  validate: function(username, password, collection) {
    return collection.findOne({username: username, password: password});
  }
}

// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
  delete user.password;

  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
