import cors from 'cors'
import express from 'express'
import db from '../db';
// import router from './routes/index';
import RestaurantRouter from './routes/Restaurant';
import UserRouter from './routes/User';
import SpotRouter from './routes/Spot';
import ScheduleRouter from './routes/Schedule';
import bodyParser from 'body-parser'
const port = process.env.PORT || 4000;
import path from "path"

const app = express();
app.use(cors());
app.use(bodyParser.json());

// routers
app.use('/restaurants/', RestaurantRouter);
app.use('/users/', UserRouter);
app.use('/spots/', SpotRouter);
app.use('/schedules/', ScheduleRouter);

if (process.env.NODE_ENV == "production"){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function(req, res){
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
    })
}

app.listen(port, () => {
    console.log(`Listening at port ${port}!`)
});

db.connect();