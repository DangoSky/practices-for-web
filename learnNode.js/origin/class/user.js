function User(res, name, something) {
  this.name = name;
  this.something = something;
  this.todo = function() {
    res.write(this.name + " is " + this.something + ".(类的使用)\n");
  }
}

module.exports = User;