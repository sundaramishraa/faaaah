const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const Book=require('./modules/book');
const app=express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.post('/book',async(req,res)=>{
    try{
        const book=await Book.create(req.body);
        res.status(201).json(book);
    }
    catch(err){
        res.status(400).json({message:err.message});
    }
});