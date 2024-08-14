const express = require('express');
const cookieParser = require("cookie-parser")
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require("./routes/authRouter")
const ownerRouter = require("./routes/ownerRouter")
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const cartRouter = require('./routes/cartRouter')
const orderRouter = require('./routes/orderRouter')

const connectDb = require("./config/connectDB")

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true, 
  };

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send("server is running")
})

app.use('/api/auth',authRouter);

app.use('/api/owner',ownerRouter);
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);


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