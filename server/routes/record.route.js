const express = require('express');

const recordRouter = express.Router();

const { asyncHandler, auth } = require('../middlewares');
const url = require('url');
// Models defined in mongoose schema
const Record = require('../models/record');

recordRouter.post('/record', auth(), asyncHandler(addRecord));

recordRouter.get('/record', auth(), asyncHandler(getRecord));

recordRouter.get('/records', auth(), asyncHandler(getRecords));

recordRouter.put('/record', auth(), asyncHandler(updateRecord));

async function addRecord(req, res) {
  const input = req.body;
  let record = await new Record(input).save();
  res.json(record);
}

async function getRecords(req, res) {
  let urlParams = url.parse(req.url, true);
  let query = urlParams.query;
  let userId = query.userId;
  let records = await Record.find({ userId: userId });
  res.json(records);
}

async function getRecord(req, res) {
  let urlParams = url.parse(req.url, true);
  let query = urlParams.query;
  let userId = query.userId;
  let registerId = query.registerId;
  let records = await Record.find({userId: userId, registerId:registerId});
  res.json(records);
}

async function updateRecord(req, res) {
  let urlParams = url.parse(req.url, true);
  let query = urlParams.query;
  let id = query.id;
  console.log(  id )
  let record = await Record.updateOne({ _id: id }, { $set: req.body });
  res.json(record);
}

module.exports = recordRouter;
