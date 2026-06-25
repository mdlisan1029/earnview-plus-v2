const API='https://earnview-plus-v2.onrender.com';


/*================ OFFERS ================*/

async function addOffer(){

try{

const formData=new FormData();

formData.append(
'title',
document.getElementById('title').value
);

formData.append(
'description',
document.getElementById('description').value
);

formData.append(
'reward',
document.getElementById('reward').value
);

formData.append(
'link',
document.getElementById('link').value
);

formData.append(
'category',
document.getElementById('category').value
);


const file=document.getElementById('image').files[0];

if(file){

formData.append(
'image',
file
);

}


await fetch(

API+'/api/offers/add',

{

method:'POST',

body:formData

}

);


alert('Offer Added');

loadOffers();

}

catch(e){

console.log(e);

}

}



async function loadOffers(){

const box=document.getElementById(

'offersList'

);

if(!box)return;



const res=await fetch(

API+'/api/offers'

);


const offers=await res.json();


let html='';



offers.forEach(o=>{


html+=`

<div class="card">

<h3>${o.title}</h3>

<p>${o.reward} BDT</p>

<img
src="${API}/uploads/${o.image}"
width="100"
>

<br>

<button onclick="editOffer(${o.id})">

Edit

</button>


<button onclick="deleteOffer(${o.id})">

Delete

</button>

</div>

`;



});


box.innerHTML=html;

}




async function editOffer(id){


const title=prompt(

'Title'

);

if(!title)return;



const description=prompt(

'Description'

);

const reward=prompt(

'Reward'

);

const link=prompt(

'CPA Link'

);

const category=prompt(

'Category'

);



await fetch(

API+

'/api/offers/edit/'+id,

{

method:'PUT',

headers:{

'Content-Type':'application/json'

},

body:JSON.stringify({

title,
description,
reward,
link,
category

})

}

);


loadOffers();

}



async function deleteOffer(id){

if(!confirm(

'Delete Offer ?'

)) return;



await fetch(

API+

'/api/offers/'+id,

{

method:'DELETE'

}

);


loadOffers();

}


/*================ PROOFS ================*/


async function loadProofs(){


const box=document.getElementById(

'proofsList'

);

if(!box)return;



const res=await fetch(

API+

'/api/proofs'

);


const proofs=await res.json();


let html='';



proofs.forEach(p=>{


html+=`

<div class="card">

<p>User : ${p.userId}</p>

<p>Offer : ${p.offerId}</p>

<img
src="${API}/uploads/${p.image}"
width="120"
>

<p>${p.status}</p>

<button onclick="approveProof(${p.id})">

Approve

</button>

<button onclick="rejectProof(${p.id})">

Reject

</button>

</div>

`;



});


box.innerHTML=html;

}



async function approveProof(id){

await fetch(

API+

'/api/proofs/approve/'+id,

{

method:'POST'

}

);


loadProofs();

}



async function rejectProof(id){

await fetch(

API+

'/api/proofs/reject/'+id,

{

method:'POST'

}

);


loadProofs();

}



/*================ WITHDRAW ================*/


async function loadWithdraws(){


const box=document.getElementById(

'withdrawsList'

);

if(!box)return;



const res=await fetch(

API+

'/api/withdraw'

);


const data=await res.json();


let html='';



data.forEach(w=>{


html+=`

<div class="card">

<p>User : ${w.userId}</p>

<p>Amount : ${w.amount} BDT</p>

<p>Method : ${w.method}</p>

<p>Number : ${w.number}</p>

<p>Status : ${w.status}</p>

<button onclick="approveWithdraw(${w.id})">

Approve

</button>

<button onclick="rejectWithdraw(${w.id})">

Reject

</button>

</div>

`;



});


box.innerHTML=html;

}



async function approveWithdraw(id){

await fetch(

API+

'/api/withdraw/approve/'+id,

{

method:'POST'

}

);


loadWithdraws();

}



async function rejectWithdraw(id){

await fetch(

API+

'/api/withdraw/reject/'+id,

{

method:'POST'

}

);


loadWithdraws();

}


/*================ DASHBOARD ================*/


async function loadStats(){

if(!document.getElementById('users'))

return;



const res=await fetch(

API+

'/api/analytics/stats'

);


const data=await res.json();



document.getElementById(

'users'

).innerText=

data.totalUsers;



document.getElementById(

'statsOffers'

).innerText=

data.totalOffers;



document.getElementById(

'statsProofs'

).innerText=

data.pendingProofs;



document.getElementById(

'statsWithdraws'

).innerText=

data.pendingWithdraws;



document.getElementById(

'paid'

).innerText=

data.totalPaid+

' BDT';


}


/*================ INIT ================*/

loadOffers();

loadProofs();

loadWithdraws();

loadStats();
