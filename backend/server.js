import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connect } from "./src/db/index.js";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.CORS,
  })
);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());


const port = process.env.PORT || 4000;
connect()
  .then(() => {
    console.log("database connected");
    app.listen(port, () => {
      console.log("app listening on port", port);
    });
  })
  .catch(() => {
    console.log("error connecting to database");
  });


  import userRouter from './src/routes/user.route.js'
  import storeRouter from './src/routes/store.router.js'
  import productRouter from './src/routes/product.router.js'  
  import orderRouter from './src/routes/order.router.js'
  import cartRouter from './src/routes/cart.router.js'


  app.use('/api/user',userRouter)
  app.use('/api/store',storeRouter)
  app.use('/api/product',productRouter)
  app.use('/api/order',orderRouter)
  app.use('/api/cart',cartRouter)
  
