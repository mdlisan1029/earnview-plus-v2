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



exports.getUser=(req,res)=>{


const db=readDB();



const id=parseInt(

req.params.id

);



const user=db.users.find(

u=>u.id===id

);



if(!user){

return res.status(404).json({

success:false

});

}



res.json({

id:user.id,

username:user.username,

balance:user.balance||0,

referrals:user.referrals||0,

referralCode:user.referralCode

});


};
