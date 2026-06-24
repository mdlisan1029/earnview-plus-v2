const express = require('express');

const router = express.Router();

const upload = require('../config/upload');

const proofController = require('../controllers/proofController');



router.post(

'/submit',

upload.single(

'image'

),

proofController.submitProof

);



router.get(

'/',

proofController.getProofs

);



module.exports = router;
