const express = require('express');

const path = require('path');

const app = express();


const adminRoutes = require('./routes/admin');
const offerRoutes = require('./routes/offers');
const proofRoutes = require('./routes/proofs');
const withdrawRoutes = require('./routes/withdraw');
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const referralRoutes=require('./routes/referral');


app.use(express.json());


app.use('/api/admin', adminRoutes);

app.use('/api/offers', offerRoutes);

app.use('/api/proofs', proofRoutes);

app.use('/api/withdraw', withdrawRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/referral', referralRoutes);


app.use(
'/uploads',
express.static(
path.join(__dirname, 'uploads')
)
);


app.get('/', (req, res) => {

res.send('EarnView Plus Backend Running');

});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

console.log(`Server running on ${PORT}`);

});
