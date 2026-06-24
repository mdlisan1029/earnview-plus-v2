if(!user){

user={

id:Date.now(),

telegram_id,

username,

balance:0,

created_at:new Date(),

referralCode:Date.now().toString(),

referredBy:null,

referrals:0

};


db.users.push(

user

);


writeDB(

db

);

}
