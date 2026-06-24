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




exports.createWithdraw=(req,res)=>{


const db=readDB();



const {

userId,
amount,
method,
number

}=req.body;



if(Number(amount)<100){

return res.status(400).json({

success:false,

message:'Minimum withdraw is 100 BDT'

});

}



let fee=0;


if(

method==='bkash'

||

method==='nagad'

){

fee=5;

}



const withdraw={


id:Date.now(),


userId,


amount:Number(amount),


fee,


finalAmount:Number(amount)-fee,


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


success:true,


message:'Withdraw request submitted'


});



};






exports.getWithdraws=(req,res)=>{


const db=readDB();



res.json(

db.withdrawals

);



};







exports.approveWithdraw=(req,res)=>{


const db=readDB();



const id=parseInt(

req.params.id

);



const withdraw=db.withdrawals.find(

w=>w.id===id

);



if(!withdraw){

return res.status(404).json({

success:false

});

}



withdraw.status='approved';



writeDB(

db

);



res.json({

success:true

});


};







exports.rejectWithdraw=(req,res)=>{


const db=readDB();



const id=parseInt(

req.params.id

);



const withdraw=db.withdrawals.find(

w=>w.id===id

);



if(!withdraw){

return res.status(404).json({

success:false

});

}



withdraw.status='rejected';



const user=db.users.find(

u=>u.id==withdraw.userId

);



if(user){

if(!user.balance){

user.balance=0;

}


user.balance+=Number(

withdraw.amount

);

}



writeDB(

db

);



res.json({

success:true

});


};
