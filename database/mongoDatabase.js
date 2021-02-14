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
        'mongodb+srv://admin:woodpecker123@foreignaffairscluster.iixgc.mongodb.net/ForeignAffairsDB?retryWrites=true&w=majority'
      )
      .then(() => {
        console.log('Database connection successfully');
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = new Database();
