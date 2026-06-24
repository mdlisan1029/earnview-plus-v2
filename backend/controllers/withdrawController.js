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





exports.createWithdraw=(req,res)=>{


const db=readDB();



const {

userId,

amount,

method,

number

}=req.body;




const withdraw={


id:Date.now(),


userId,


amount,


method,


number,


status:'pending'


};



db.withdrawals.push(

withdraw

);



writeDB(

db

);



res.json({

success:true

});


};






exports.getWithdraws=(req,res)=>{


const db=readDB();



res.json(

db.withdrawals

);


};
