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
category

}=req.body;



let image='';



if(req.file){

image=req.file.filename;

}



const offer={


id:Date.now(),


title,


description,


reward:Number(reward),


link,


category,


image,


status:'active'


};



db.offers.push(

offer

);



writeDB(

db

);



res.json({


success:true,


message:'Offer Added',


offer


});


};






exports.getOffers=(req,res)=>{


const db=readDB();



res.json(

db.offers

);



};






exports.updateOffer=(req,res)=>{


const db=readDB();



const id=parseInt(

req.params.id

);



const offer=db.offers.find(

o=>o.id===id

);



if(!offer){

return res.status(404).json({

success:false,

message:'Offer not found'

});

}



const {

title,
description,
reward,
link,
category

}=req.body;



offer.title=title;
offer.description=description;
offer.reward=Number(reward);
offer.link=link;
offer.category=category;



writeDB(

db

);



res.json({


success:true,


message:'Offer Updated'


});


};







exports.deleteOffer=(req,res)=>{


const db=readDB();



const id=parseInt(

req.params.id

);



const offer=db.offers.find(

o=>o.id===id

);



if(

offer

&&

offer.image

)

{


const filePath=path.join(

__dirname,

'../uploads',

offer.image

);



if(

fs.existsSync(

filePath

)

)

{


fs.unlinkSync(

filePath

);


}


}




db.offers=


db.offers.filter(

o=>o.id!==id

);




writeDB(

db

);




res.json({


success:true,


message:'Offer Deleted'


});


};
