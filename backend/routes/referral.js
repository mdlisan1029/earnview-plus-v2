const express=require('express');

const router=express.Router();

const referralController=require(

'../controllers/referralController'

);


router.get(

'/:id',

referralController.getReferral

);


module.exports=router;
