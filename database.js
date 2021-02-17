const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        'mongodb+srv://admin:woodpecker123@twitterclonecluster.mjlxo.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority'
      )
      .then(() => {
        console.log('Database connection successfully'.green);
      })
      .catch((err) => {
        console.log(`${err}`.red);
        throw err;
      });
  }
}

module.exports = new Database();
