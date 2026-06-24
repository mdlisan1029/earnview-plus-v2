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




exports.getReferral=(req,res)=>{


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


code:user.referralCode,


count:user.referrals


});


};
