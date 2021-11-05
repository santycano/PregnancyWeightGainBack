const { configure } = require('./config');
const { omit } = require('lodash');
const mongoose = require('mongoose');

// configure
const { mongodb } = configure;
for (const key of Object.keys(mongodb)) {
  mongoose.set(key, mongodb[key]);
}

// plugins
mongoose.plugin(schema => {
  schema.methods.toClient = function() {
    const result = this.toJSON({ virtuals: true });
    return omit(result, ['password', '_id', '__v']);
  };
});
// event
mongoose.connection.on('open', () => {
  console.log(`Connected to MongoDB`);
});

mongoose.connection.on('error', () => {
  console.log(`Failed to connect MongoDB`);
  process.exit(-1);
});

module.exports = mongoose;
