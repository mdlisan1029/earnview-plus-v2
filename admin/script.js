const API = 'https://YOUR_RENDER_URL.onrender.com';



async function addOffer(){


const formData = new FormData();



formData.append(

'title',

document.getElementById(

'title'

).value

);



formData.append(

'description',

document.getElementById(

'description'

).value

);



formData.append(

'reward',

document.getElementById(

'reward'

).value

);



formData.append(

'link',

document.getElementById(

'link'

).value

);



formData.append(

'category',

document.getElementById(

'category'

).value

);



formData.append(

'image',

document.getElementById(

'image'

).files[0]

);




await fetch(

API+

'/api/offers/add',

{

method:'POST',

body:formData

}

);



loadOffers();



}





async function loadOffers(){


const res = await fetch(

API+

'/api/offers'

);



const offers = await res.json();



let html='';



offers.forEach(o=>{


html+=`


<div class="card">


<h3>

${o.title}

</h3>


<p>

${o.reward} BDT

</p>



<img


src="${API}/uploads/${o.image}"


width="100"


>



<br>


<button


onclick="deleteOffer(

${o.id}

)"


>


Delete


</button>



</div>


`;


});



document.getElementById(

'offers'

).innerHTML=html;



}




async function deleteOffer(id){


await fetch(


API+

'/api/offers/'+id,


{


method:'DELETE'


}


);



loadOffers();



}



loadOffers();

async function loadProofs(){

const res = await fetch(

API +

'/api/proofs'

);


const proofs = await res.json();


let html='';



proofs.forEach(p=>{


html += `


<div class="card">


<p>

User ID : ${p.userId}

</p>


<p>

Offer ID : ${p.offerId}

</p>


<img

src="${API}/uploads/${p.image}"

width="120"

>


<p>

Status :

${p.status}

</p>



<button

onclick="approveProof(

${p.id}

)"

>

Approve

</button>



<button

onclick="rejectProof(

${p.id}

)"

>

Reject

</button>


</div>



`;


});



document.getElementById(

'proofs'

).innerHTML=html;



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



loadProofs();


async function loadWithdraws(){

const res = await fetch(

API+

'/api/withdraw'

);


const data = await res.json();



let html='';



data.forEach(w=>{


html+=`


<div class="card">


<p>

User ID : ${w.userId}

</p>


<p>

Amount : ${w.amount} BDT

</p>


<p>

Fee : ${w.fee} BDT

</p>


<p>

Receive : ${w.finalAmount} BDT

</p>


<p>

Method : ${w.method}

</p>


<p>

Number : ${w.number}

</p>


<p>

Status : ${w.status}

</p>



<button

onclick="approveWithdraw(

${w.id}

)"

>

Approve

</button>



<button

onclick="rejectWithdraw(

${w.id}

)"

>

Reject

</button>



</div>


`;


});



document.getElementById(

'withdraws'

).innerHTML=html;



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



loadWithdraws();


async function loadStats(){


const res=await fetch(

API+

'/api/analytics/stats'

);


const data=await res.json();



if(document.getElementById('users')){

document.getElementById(

'users'

).innerText=

data.totalUsers;

}



if(document.getElementById('offers')){

document.getElementById(

'offers'

).innerText=

data.totalOffers;

}



if(document.getElementById('proofs')){

document.getElementById(

'proofs'

).innerText=

data.pendingProofs;

}



if(document.getElementById('withdraws')){

document.getElementById(

'withdraws'

).innerText=

data.pendingWithdraws;

}



if(document.getElementById('paid')){

document.getElementById(

'paid'

).innerText=

data.totalPaid+

' BDT';

}


}



loadStats();
