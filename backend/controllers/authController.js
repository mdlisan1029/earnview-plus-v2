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



exports.telegramLogin=(req,res)=>{


const {

telegram_id,

username,

start_param

}=req.body;



const db=readDB();



let user=db.users.find(

u=>u.telegram_id==telegram_id

);



if(!user){


let referredBy=null;



if(start_param){


const referrer=db.users.find(

u=>u.referralCode===start_param

);



if(referrer){


referredBy=referrer.id;



referrer.referrals+=1;


}



}




user={


id:Date.now(),


telegram_id,


username,


balance:0,


created_at:new Date(),


referralCode:Date.now().toString(),


referredBy,


referrals:0


};



db.users.push(

user

);



writeDB(

db

);


}




res.json({


success:true,


user


});


};
