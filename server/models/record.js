const { conf } = require('../config');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecordSchema = new Schema(
  {
    userId: {
      type: String,
      require: true
    },
      registerId: {
          type: String,
          require: true
      },
    week: {
      type: Schema.Types.Array,
      require: true
    },
      pregestationalWeight: {
          type: Schema.Types.Decimal128,
          require: true
      },
    weight: {
      type: Schema.Types.Array,
      require: true
    }
  },
  {
    versionKey: false
  }
);

const name = conf('collections.record');
module.exports = mongoose.model(name, RecordSchema, name);
