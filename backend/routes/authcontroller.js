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




exports.telegramLogin=(req,res)=>{


const db=readDB();


const {

telegram_id,
username

}=req.body;



let user=db.users.find(

u=>u.telegram_id==telegram_id

);



if(!user){

user={

id:Date.now(),

telegram_id,

username,

balance:0,

created_at:new Date()

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
