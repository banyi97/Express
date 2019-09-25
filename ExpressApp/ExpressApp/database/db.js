var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/h1b2dd', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;
