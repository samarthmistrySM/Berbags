const express = require('express');
const cookieParser = require("cookie-parser")
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require("./routes/authRouter")
const ownerRouter = require("./routes/ownerRouter")
const userRouter = require('./routes/userRouter')

const connectDb = require("./config/connectDB")

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("server is running")
})

app.use('/api/auth',authRouter);
app.use('/api/owner',ownerRouter);
app.use('/api/user',userRouter);


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