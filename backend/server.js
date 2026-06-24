const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');

const offerRoutes = require('./routes/offers');


app.use(express.json());



app.use('/api/admin', adminRoutes);

app.use('/api/offers', offerRoutes);




app.get('/', (req,res)=>{

res.send('EarnView Plus Backend Running');

});



const PORT = process.env.PORT || 5000;



app.listen(PORT,()=>{

console.log(`Server running on ${PORT}`);

});
