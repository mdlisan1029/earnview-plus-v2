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



router.post(

'/approve/:id',

proofController.approveProof

);



router.post(

'/reject/:id',

proofController.rejectProof

);



module.exports = router;
