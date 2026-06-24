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




exports.submitProof=(req,res)=>{


const db=readDB();



const {

userId,

offerId

}=req.body;



const image=req.file.filename;



const proof={

id:Date.now(),

userId,

offerId,

image,

status:'pending'

};



if(!db.proofs)

db.proofs=[];



db.proofs.push(

proof

);



writeDB(

db

);



res.json({

success:true

});


};






exports.getProofs=(req,res)=>{


const db=readDB();



res.json(

db.proofs||[]

);


};






exports.approveProof=(req,res)=>{


const db=readDB();



const id=parseInt(

req.params.id

);



const proof=db.proofs.find(

p=>p.id===id

);



if(!proof){

return res.status(404).json({

success:false

});

}



proof.status='approved';



const offer=db.offers.find(

o=>o.id==proof.offerId

);



const user=db.users.find(

u=>u.id==proof.userId

);



if (offer && user) {

if (!user.balance) {

user.balance = 0;

}

user.balance += Number(offer.reward);

}

if(user.referredBy){

const referrer=db.users.find(

u=>u.id===user.referredBy

);


if(referrer){

if(!referrer.balance){

referrer.balance=0;

}


referrer.balance +=

Number(offer.reward)*0.10;


}


  }

writeDB(

db

);



res.json({

success:true

});


};






exports.rejectProof=(req,res)=>{


const db=readDB();



const id=parseInt(

req.params.id

);



const proof=db.proofs.find(

p=>p.id===id

);



if(!proof){

return res.status(404).json({

success:false

});

}



proof.status='rejected';



writeDB(

db

);



res.json({

success:true

});


};
