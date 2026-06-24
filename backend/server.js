const express=require('express')
const adminRoutes=require('./routes/admin')
app.use(express.json())
app.use(

'/api/admin',

adminRoutes

)
