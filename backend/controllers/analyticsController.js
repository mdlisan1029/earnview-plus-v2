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


exports.getStats=(req,res)=>{

const db=readDB();


const totalUsers=db.users.length;

const totalOffers=db.offers.length;


const pendingProofs=

db.proofs.filter(

p=>p.status==='pending'

).length;



const pendingWithdraws=

db.withdrawals.filter(

w=>w.status==='pending'

).length;



let totalPaid=0;


db.withdrawals.forEach(w=>{


if(

w.status==='approved'

){

totalPaid+=Number(

w.finalAmount||0

);

}


});



res.json({


totalUsers,

totalOffers,

pendingProofs,

pendingWithdraws,

totalPaid


});


};
