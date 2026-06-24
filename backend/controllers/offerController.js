const fs = require('fs');
const path = require('path');

const dbPath = path.join(

__dirname,

'../database.json'

);


function readDB(){

return JSON.parse(

fs.readFileSync(

dbPath

)

);

}


function writeDB(data){

fs.writeFileSync(

dbPath,

JSON.stringify(

data,

null,

2

)

);

}




exports.addOffer=(req,res)=>{


const db=readDB();



const {

title,

description,

reward,

link,

category,

image

}

=req.body;



const offer={


id:Date.now(),


title,


description,


reward,


link,


category,


image,


status:"active"



};



db.offers.push(

offer

);



writeDB(

db

);



res.json({


success:true,


message:"Offer Added",


offer



});



};





exports.getOffers=(req,res)=>{


const db=readDB();



res.json(


db.offers


);



};






exports.deleteOffer=(req,res)=>{


const db=readDB();



const id=parseInt(

req.params.id

);



db.offers=


db.offers.filter(


o=>o.id!==id


);




writeDB(

db

);




res.json({


success:true,


message:"Offer Deleted"


});



};
