const express = require('express');

const router = express.Router();

const offerController = require('../controllers/offerController');



router.post(

'/add',

offerController.addOffer

);



router.get(

'/',

offerController.getOffers

);



router.delete(

'/:id',

offerController.deleteOffer

);



module.exports = router;
