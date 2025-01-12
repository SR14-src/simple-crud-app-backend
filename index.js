const express= require('express')
const app=express();
const Product= require('./models/product.model.js');
const mongoose=require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(3000,()=> {
    console.log('server is running on port 3000');
});

app.get('/',(req,res)=>{
    res.send("hello from node api server updatedd");
});

app.get('/api/products', async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }   catch(error){
        res.status(500).json({message:error.message});
    }
});

app.get('/api/products/:id', async(req,res) => {
    try{
        const {id} =req.params;
        const product=await Product.findById(id);
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

app.get('/api/products',(req,res)=>{
    res.send("Data Received");
});

app.post('/api/products',async(req,res)=>{
    try{
        const product= await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.put('/api/products/:id' , async(req,res) => {
    try{
        const {id}=req.params;
        const product= await Product.findByIdAndUpdate(id,req.body);

        if(!product){
            return res.status(500).json({message:error.message});
        }
        const updatedProduct= await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch(error){
        res.status(500).json({message:error.message});
    }
});

app.delete('/api/products/:id', async(req,res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message:"product not found"});
        }
        res.status(200).json({message:"product deleted"});
    } catch(error){
        res.status(500).json({message:error.message});
    }
});

mongoose.connect("MONGO_URI")
.then(()=>{
    console.log("Connected to database");
})
.catch(()=>{
    console.log("connection failed!!");
});
