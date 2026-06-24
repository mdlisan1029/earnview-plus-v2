const API = 'https://YOUR_RENDER_URL.onrender.com';

const userId = 1;



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

width="120"

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



<button

onclick="submitProofPage(

${o.id}

)"

>

Complete Offer

</button>



</div>

`;

});


document.getElementById(

'offers'

).innerHTML=html;


}





function submitProofPage(id){

window.location.href=

'proof.html?offer='

+

id;

}




async function createWithdraw(){


const amount=

document.getElementById(

'amount'

).value;



const method=

document.getElementById(

'method'

).value;



const number=

document.getElementById(

'number'

).value;



await fetch(

API+

'/api/withdraw/create',

{

method:'POST',

headers:{

'Content-Type':'application/json'

},

body:JSON.stringify({

userId,

amount,

method,

number

})

}


);



alert(

'Withdraw Submitted'

);


}




async function loadProfile(){


document.getElementById(

'uid'

).innerText=userId;


}




if(

document.getElementById(

'offers'

)

){

loadOffers();

}



if(

document.getElementById(

'uid'

)

){

loadProfile();

  }
