import mongoose from "mongoose";
import dotenv from 'dotenv-defaults';
import genData from './genData'
dotenv.config();

export default{
    connect: () => {
        mongoose.connect(
            process.env.MONGO_URL,{
                useNewUrlParser: true, useUnifiedTopology: true,
            }
        ).then((res) => {
            console.log("connect to MongoDB")
            if(process.env.MODE == "SET")
                genData.genData();            
        }
            );
    }
}