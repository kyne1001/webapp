var notes = {
 
  getAll: function(req, res) {
    res.send('Get all');
  },
 
  getOne: function(req, res) {
    res.send('Get one');
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
