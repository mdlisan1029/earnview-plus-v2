const express = require('express');

const router = express.Router();

const withdrawController = require('../controllers/withdrawController');


router.post(

'/create',

withdrawController.createWithdraw

);


router.get(

'/',

withdrawController.getWithdraws

);


router.post(

'/approve/:id',

withdrawController.approveWithdraw

);


router.post(

'/reject/:id',

withdrawController.rejectWithdraw

);


module.exports = router;
