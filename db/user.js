var mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017', function(err) {
	if (err) throw err;
	console.log('Succesfully connected');
});

var userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	email: { type: String, required: true, unique: true},
	password: String,
	firstName: String,
	lastName: String,
	bio: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;