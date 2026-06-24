const fs=require('fs');

const path=require('path');


const dbPath=path.join(

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
