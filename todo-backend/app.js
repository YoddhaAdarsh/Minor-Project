const express=require('express');
const mongoose=require("mongoose");
const cors=require("cors")
const dotenv=require("dotenv")
const app=express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT=process.env.PORT || 8080
mongoose.connect(process.env.DB).then(()=>{
    console.log("Connected")
}).catch((err)=>console.log("failed"));

const userRouter=require("./Routes/UserRoutes");
const teamRouter=require("./Routes/TeamRoutes");
const taskRouter=require("./Routes/TaskRoutes");
app.use("/api/v1/user",userRouter);
app.use("/api/v1/Team",teamRouter);
app.use("/api/v1/Task",taskRouter);
app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})

