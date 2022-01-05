import  express  from "express";
import cors from "cors";
import  Mongoose  from "mongoose";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt";
// configration karna

const port = process.env.PORT || 5008;


const app= express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors());

const db = "mongodb+srv://amit:12345@cluster0.xeimo.mongodb.net/login?retryWrites=true&w=majority"

Mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},()=>{
    console.log("db connect")
})

// user schema cteate
const userSchema = new Mongoose.Schema({
    name:String,
    email:String,
    password:String,
    message:String,

})
const Ram = new Mongoose.model("Ram",userSchema)
 // alert("posted");
// Routs
app.post("/login", (req,res)=>{
    const { email, password} = req.body
    Ram.findOne({email:email},(err,user)=>{
        if(user){
          if(password === user.password){
              res.send({message:"Login success",user:user})
              console.log("Login success")
          }else{
              res.send({message:"password incorrect"})
              console.log("password incorrect")
          }
        }else{
          res.send({message:"user not register"})
          console.log("user not register")
        }
    })

})

app.post("/register", (req,res)=>{
    // res.send("my API register")
    //kjsdfh sdlkjfh sdkjf ksdjhf kjsdh fkjhsdlk jfhsd
    const {name, email, password} = req.body
     Ram.findOne({email:email},(err,user)=>{
         if(user){
             res.send({message:"user already resiter"})
         }else{
            const user = new Ram({
                name,
                email,
                password
            })
            user.save(err =>{
                if(err){
                   res.send(err)
                }else{
                    res.send({message:"successfully registered Please login now"})

                   // email

                   nodemailer.createTestAccount();                
                   const transporter = nodemailer.createTransport({
                       service: 'Gmail',
                       auth: {
                           user: 'amit.c.dedicated@gmail.com',
                           pass: 'Bestadmin.@123'
                       }
                   });                  
                   console.log('Email send');
                   transporter.sendMail({
                   from: 'amit.c.dedicated@gmail.com',
                     to: 'amit.c.dedicated@gmail.com',
                     subject: 'FENTA VIDEO signup success',  
                     html: "<b>Hello world?</b>",
                   });
                    

                }
            })
         }
     })
  
    })

app.listen(port,()=>{
    console.log(`port is running on port no. ${port}`)
})



