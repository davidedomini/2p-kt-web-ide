var connection = new Mongo();
var db = connection.getDB('2pktweb'); //creates the db
db.createCollection('users', function(err, collection){}) //creates the collection