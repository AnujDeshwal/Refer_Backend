const express = require("express");
const { corsOptions } = require("./utility/config");
const cors = require('cors')
const dotenv = require('dotenv')
const app = express();
const {PrismaClient} = require("@prisma/client");
const { sendMail } = require("./utility/EmailSend");
const prisma = new PrismaClient();

const PORT = 8000
dotenv.config();

//middlewares
app.use(express.json())
  app.use(cors(corsOptions))

//Define route over here
app.post("/create-refer" ,async(req,res,next)=>{
    try{
        const {referrerName , referrerEmail , referrerPhone,refereeName , refereeEmail , refereePhone , selectedProgram}  = req.body;
        const data = req.body;
        const response = await prisma.refer.create({data})
        const subject1 = "Confirmation of referrence"
        const subject2 = `Referral from ${referrerName}`
        const html1 = `<p>Hi ${referrerName} , You have successfully referred ${refereeName} for ${selectedProgram}.</p><br><h1>Regards,</h1><h1>Accredian</h1>`;
        const html2=`<p>Hi  ${refereeName} , You have been referred for ${selectedProgram} by ${referrerName} .  </p> <br><h1>Regards,</h1><h1>Accredian</h1>`
        const res1 = await sendMail({to:referrerEmail , subject:subject1 ,html:html1});
        const res2 = await sendMail({to:refereeEmail ,subject: subject2 ,html:html2});
        // console.log(res1);
        return res.status(200).json({success:true});
    }catch(error){
        console.log(error)
        res.status(404).json(error);
    }finally{ 
        async() =>{
            await prisma.$disconnect();
        }
    }
})


//404 route handler
app.all("*",(req,res)=>{
    res.status(404).send({
        message: "The route you are searching for does not exist in the server",
        result:false
    })
})
 


//error hanlder
app.use((err , req,res , next)=>{
    console.log(err);
    res.status(500).send({
        message:"there was some internal server error"  ,
        result:"false"
    })
})
app.listen(PORT , ()=>{
    console.log("Successfully listening to the port:",PORT);
})