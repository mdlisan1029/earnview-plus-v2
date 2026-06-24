const express = require('express');

const app = express();

const adminRoutes = require('./routes/admin');

app.use(express.json());

app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {

    res.send('EarnView Plus Backend Running');

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on ${PORT}`);

});
