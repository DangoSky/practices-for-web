var User = require("./user");

function Student(res, name, something, location) {
  User.apply(this, [res, name, something]);
  this.location = location;
  this.show = function() {
    res.write(this.name + " is " + this.something + " at " + this.location + ".(类的继承)\n");
  }
}

module.exports = Student;