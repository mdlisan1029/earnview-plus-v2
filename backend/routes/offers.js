const express = require('express');

const router = express.Router();

const offerController = require('../controllers/offerController');

const upload = require('../config/upload');



router.post(

'/add',

upload.single(

'image'

),

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
