if(!user){

let referredBy = null;

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
