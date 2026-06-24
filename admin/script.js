async function login(){

const username =
document.getElementById("username").value;

const password =
document.getElementById("password").value;


const response = await fetch(

"https://YOUR_RENDER_URL.onrender.com/api/admin/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

username,

password

})

}

);


const data = await response.json();


if(data.success){

localStorage.setItem(

"adminToken",

data.token

);

window.location.href="index.html";

}


else{

document.getElementById(

"msg"

).innerText=

data.message;

}


}
