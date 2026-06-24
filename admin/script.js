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
