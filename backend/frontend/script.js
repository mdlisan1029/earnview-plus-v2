const API = 'https://earnview-plus-v2.onrender.com';

const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
}

let userId = null;


/* ================= TELEGRAM LOGIN ================= */

async function telegramLogin() {

    try {

        const telegram_id =
            tg?.initDataUnsafe?.user?.id;

        const username =
            tg?.initDataUnsafe?.user?.username || 'user';

        const start_param =
            tg?.initDataUnsafe?.start_param || null;


    if(!telegram_id){

userId = 1;

localStorage.setItem(
'userId',
1
);

return;

    }


        const res = await fetch(
            API + '/api/auth/telegram',
            {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    telegram_id,
                    username,
                    start_param

                })

            }
        );


        const data = await res.json();

        userId = data.user.id;

        localStorage.setItem(
            'userId',
            userId
        );

    }

    catch (e) {

        console.log(e);

    }

}


/* ================= OFFERS ================= */

async function loadOffers() {

    try {

        const res = await fetch(

            API + '/api/offers'

        );


        const offers = await res.json();


        let html = '';


        offers.forEach(o => {


            html += `

<div class="card">

<img
src="${API}/uploads/${o.image}"
width="100"
>

<h3>${o.title}</h3>

<p>${o.reward} BDT</p>

<p>${o.description}</p>

<button onclick="submitProofPage(${o.id})">

Complete Offer

</button>

</div>

`;

        });



        const box = document.getElementById(

            'offers'

        );


        if (box) {

            box.innerHTML = html;

        }

    }

    catch (e) {

        console.log(e);

    }

}


function submitProofPage(id) {

    window.location.href =

        'proof.html?offer=' + id;

}


/* ================= PROFILE ================= */

async function loadProfile() {


    try {


        const res = await fetch(

            API +

            '/api/user/' +

            userId

        );


        const data = await res.json();



        if (document.getElementById('uid'))

            document.getElementById('uid').innerText =

                data.id;



        if (document.getElementById('bal'))

            document.getElementById('bal').innerText =

                data.balance;



        if (document.getElementById('refs'))

            document.getElementById('refs').innerText =

                data.referrals;



        if (document.getElementById('refCode'))

            document.getElementById('refCode').innerText =

                'https://t.me/YOUR_BOT?start=' +

                data.referralCode;


    }


    catch (e) {

        console.log(e);

    }

}



/* ================= PROOF ================= */

async function submitProof() {


    const params = new URLSearchParams(

        window.location.search

    );


    const offerId = params.get(

        'offer'

    );


    const file = document.getElementById(

        'proof'

    ).files[0];



    if (!file) {

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

        API +

        '/api/proofs/submit',

        {

            method: 'POST',

            body: formData

        }

    );


    alert(

        'Proof Submitted'

    );


    window.location.href =

        '/app/index.html';

}



/* ================= WITHDRAW ================= */

async function createWithdraw() {


    const amount =

        document.getElementById(

            'amount'

        ).value;


    const method =

        document.getElementById(

            'method'

        ).value;


    const number =

        document.getElementById(

            'number'

        ).value;



    if (amount < 100) {

        alert(

            'Minimum withdraw 100 BDT'

        );

        return;

    }



    await fetch(

        API +

        '/api/withdraw/create',

        {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json'

            },

            body: JSON.stringify({

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


/* ================= INIT ================= */

async function init() {


    await telegramLogin();


    if (

        document.getElementById(

            'offers'

        )

    ) {

        await loadOffers();

    }


    if (

        document.getElementById(

            'uid'

        )

    ) {

        await loadProfile();

    }

}


init();
