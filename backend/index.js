const express = require('express');
const cookieParser = require("cookie-parser")
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    console.log("server is running");
})

app.listen(PORT,()=>{
    console.log(`Server runnning on http://localhost:${PORT}`);
})
