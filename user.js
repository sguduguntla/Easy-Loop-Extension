var User = function() {
  this.categories = [];
};

User.prototype.removeCategory = function(categoryName) {
  var one = 1;
  for (var i = 0; i < this.categories.length; i++) {
    if (this.categories[i].name == categoryName) {
      this.categories.splice(i, 1); //removes 1 element at the index: "indexRemove"
    }
  }
}

User.prototype.insertCategory = function(categoryObject) {
  this.categories.push(categoryObject);
};

User.prototype.getAllCategories = function() {
  return this.categories;
}

User.prototype.insertName = function(categoryName, name) {
  this.categories.forEach(function(category) {
    if (category.name == categoryName) {
      category.name = name;
    }
  });
}

User.prototype.insertReceived = function(categoryName, received) {
  this.categories.forEach(function(category) {
    if (category.name == categoryName) {
      category.received = received;
    }
  });
}

User.prototype.insertScore = function(categoryName, score) {
  this.categories.forEach(function(category) {
    if (category.name == categoryName) {
      category.score = score;
    }
  });
}

User.prototype.insertTotal = function(categoryName, total) {
  this.categories.forEach(function(category) {
    if (category.name == categoryName) {
      category.total = total;
    }
  });
}

User.prototype.insertWeight = function(categoryName, weight) {
  this.categories.forEach(function(category) {
    if (category.name == categoryName) {
      category.weight = weight;
    }
  });
}

User.prototype.getName = function(categoryName, callback) {
  this.categories.forEach(function(category) {
    if (category.name == categoryName) {
      callback(category.name);
    }
  });
}

User.prototype.getReceived = function(categoryName, callback) {
  this.categories.forEach(function(category) {
    if (category.name == categoryName) {
      callback(category.received);
    }
  });
}

User.prototype.getScore = function(categoryName, callback) {
  this.categories.forEach(function(category) {
    if (category.name == categoryName) {
      callback(category.score);
    }
  });
}

User.prototype.getTotal = function(categoryName, callback) {
  this.categories.forEach(function(category) {
    if (category.name == categoryName) {
      callback(category.total);
    }
  });
}

User.prototype.getWeight = function(categoryName, callback) {
  this.categories.forEach(function(category) {
    if (category.name == categoryName) {
      callback(category.weight);
    }
  });
}
