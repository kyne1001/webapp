function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true
  });
}

// Collection name
define("USERS", 'users');
define("NOTES", 'notes');
