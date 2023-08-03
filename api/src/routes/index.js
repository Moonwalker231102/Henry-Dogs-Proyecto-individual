const { Router } = require('express');
const dogsRouter = require('./dogsRouter');

const router = Router();

router.use("/dogs", dogsRouter);

module.exports = router;
