//Mingo db password: 6rT6bTyE3E4P3Qdm
//mongodb+srv://sundaramishraa:6rT6bTyE3E4P3Qdm@clusterbhai.m1muyiy.mongodb.net/?appName=ClusterBhai

const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const Student=require('./modules/student');
const app=express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI environment variable');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

//Route for creating a student
app.post('/students',async(req,res)=>{
    try{
      const student = await Student.create(req.body);
      res.status(201).json(student);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});

app.get('/students/:id',async(req,res)=>{
    try{
        const student=await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({message:'Student not found'});
        }
        res.json(student);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});


app.put('/students/:id',async(req,res)=>{
    try{
        const student=await Student.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if (!student) {
            return res.status(404).json({message:'Student not found'});
        }
        res.json(student);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});