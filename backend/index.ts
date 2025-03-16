import express,{Request,Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from './routes/user.route';




dotenv.config();

const app = express();



const corsOptions = {
    origin:`${process.env.FRONTEND_URL}`,
    methods:["POST","GET","PUT","DELETE"],
};


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors(corsOptions));


app.get("/",(req:Request,res:Response)=>{
    res.json({
        message:"route is  working 1",
    });
});



app.use("/api/v1", userRouter);






const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server is running at : ${PORT}`);
});


