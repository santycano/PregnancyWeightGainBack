const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  res.toClient = doc => {
    res.json(doc.toClient ? doc.toClient() : doc);
    return res;
  };
  next();
});

router.use(require('./user.route'));
router.use(require('./record.route'));

module.exports = router;
