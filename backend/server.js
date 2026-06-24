const express = require('express');

const path = require('path');

const app = express();

const proofRoutes = require('./routes/proof')
  
const adminRoutes = require('./routes/admin');

const offerRoutes = require('./routes/offers');



app.use(express.json());



app.use(

'/api/admin',

adminRoutes

);


app.use(

'/api/offers',

offerRoutes

);




app.use(

'/uploads',

express.static(

path.join(

__dirname,

'uploads'

)

)

);




app.get('/',(req,res)=>{


res.send(

'EarnView Plus Backend Running'

);


});




const PORT = process.env.PORT || 5000;




app.listen(PORT,()=>{


console.log(

`Server running on ${PORT}`

);


});
