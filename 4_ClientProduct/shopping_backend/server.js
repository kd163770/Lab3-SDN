// Khai báo module express để tạo webserver
import express from "express";
import * as dotenv from 'dotenv'
import { categoryRouter, commentRouter, imageRouter, productRouter } from "./routes/index.js";
import connectDB from "./database.js";
import cors from 'cors'

dotenv.config();
// Khởi tạo container cho web server
const app = express();
app.use(cors())
//Định tuyến cho root router
app.get('/', (req, res) => {
    res.send("Welcome to NodeJSSKKK");
})
app.use(express.json()); // add middleware ddeer ungws udngj express lafm vieejc voi json
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.static('public'));
//Routing tới các router tương ứng
app.use('/products', productRouter)
app.use('/images', imageRouter)
app.use('/categories', categoryRouter)
app.use('/comments', commentRouter)

//Khai báo port 
const port = process.env.PORT || 8080;

//Lắng nghe các request gửi tới web-server
app.listen(port, async () => {
    connectDB();
    console.log(`Server running on: http://localhost:${port}`);
})