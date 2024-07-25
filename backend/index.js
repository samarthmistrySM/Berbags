const express = require('express');
const cookieParser = require("cookie-parser")
const morgan = require('morgan');

const authRouter = require("../backend/routes/authRouter")
const ownerRouter = require("../backend/routes/ownerRouter")
const connectDb = require("./config/connectDB")

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("server is running")
})

app.use('/api/auth',authRouter);
app.use('/api/owner',ownerRouter);

const startServer = async() =>{
    try {
        await connectDb(process.env.MONGO_URL);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error.message);
        process.exit(1); 
    }
}

startServer();