const API = "https://YOUR_RENDER_URL.onrender.com";

const tg = window.Telegram.WebApp;

tg.ready();

let userId = null;



async function telegramLogin(){

try{

const telegram_id = tg.initDataUnsafe?.user?.id;

const username = tg.initDataUnsafe?.user?.username || "user";


if(!telegram_id){

console.log("Telegram user not found");

return;

}


const res = await fetch(

API+'/api/auth/telegram',

{

method:'POST',

headers:{

'Content-Type':'application/json'

},

body:JSON.stringify({

telegram_id,

username

})

}

);


const data = await res.json();


userId = data.user.id;


localStorage.setItem(

'userId',

userId

);


}catch(e){

console.log(e);

}

}




async function loadOffers(){


const res = await fetch(

API+'/api/offers'

);


const offers = await res.json();


let html='';



offers.forEach(o=>{


html+=`

<div class="card">


<img

src="${API}/uploads/${o.image}"

width="100"

>


<h3>

${o.title}

</h3>


<p>

${o.reward} BDT

</p>


<p>

${o.description}

</p>



<button onclick="submitProofPage(${o.id})">

Complete Offer

</button>



</div>

`;


});



if(document.getElementById('offers')){


document.getElementById(

'offers'

).innerHTML=html;


}



}



function submitProofPage(id){

window.location.href=

'proof.html?offer='

+

id;

}




async function loadProfile(){


if(

document.getElementById(

'uid'

)

){

document.getElementById(

'uid'

).innerText=userId;


}


}





async function loadReferral(){


try{


const res = await fetch(

API+

'/api/referral/'

+

userId

);



const data = await res.json();



if(

document.getElementById(

'refCode'

)

){

document.getElementById(

'refCode'

).innerText=


'https://t.me/YOUR_BOT?start='

+

data.code;


}



}catch(e){

console.log(e);

}


}





async function submitProof(){


const params = new URLSearchParams(

window.location.search

);


const offerId = params.get(

'offer'

);



const file = document.getElementById(

'proof'

).files[0];



if(!file){

alert(

'Select Screenshot'

);

return;

}



const formData = new FormData();



formData.append(

'userId',

userId

);



formData.append(

'offerId',

offerId

);



formData.append(

'image',

file

);




await fetch(

API+

'/api/proofs/submit',

{

method:'POST',

body:formData

}

);




alert(

'Proof Submitted'

);



window.location.href='index.html';



}





async function init(){


await telegramLogin();


loadOffers();


loadProfile();


loadReferral();


}


init();
