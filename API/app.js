var express = require('express');
var app = express();

var cors = require('cors');   //FOR diffrent port run on same web like connect to React app
app.use(cors());

var bodyParser =require('body-parser');
var mongoose = require('mongoose');
var Book = require('./BookModel');
const { urlencoded } = require('body-parser');

var DbUrl = 'mongodb://127.0.0.1:27017/example';
//when facing compile time error
var whenFindEroor = {useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false }; 

mongoose.connect(DbUrl, whenFindEroor );
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/',function(req,res){
   
    res.send('<h2>its Working<h2/> <a href="http://localhost:3001/books">Click to Get Data from Mongo</a>');
}); 

//For Getting all data

app.get('/books',function(req,res){
    console.log('getting books');
    Book.find({})
    .exec(function(err,books){
        if(!err){
            console.log(books);
            res.send(books);
        }else{
            res.send("Error find");
            console.log(err);
        }
    });
});          

//For Getting all data with try and catch Asyn

app.get('/booksall',async(req,res) => {
    try{
        console.log('getting books');
         Book.find({})
        .exec(function(err,books){
            res.send(books);
        });
    }
    catch(err){
        console.log(err);
    }
});     

//For Getting id data
app.get('/books/:id',function(req,res){
    console.log('getting one book');
    Book.findOne({
        _id:req.params.id
    })
    .exec(function(err,book){
        if(!err){
            console.log(book);
            res.json(book);
        }else{
            res.send("error");
            console.log(err);
        }
    });
});

//For Adding data (1)
app.post('/books',function(req,res){
    var newBook = new Book();

    newBook.name = req.body.name;
    newBook.city = req.body.city;

    newBook.save(function(err,book){
        if(!err){
            res.send(book);
            console.log(book);
        }else{
            res.send("error")
        }
    });
})

//For Adding data (2)
app.post('/book2',function(req,res){
    Book.create(req.body,function(err,book){
        if(!err){
            res.send(book);
            console.log(book);
        }else{
            res.send("error")
        }
    });
})

//For Edit the data 
app.patch('/books/:id',function(req,res){
    Book.findOneAndUpdate(
        { _id:req.params.id},
    {$set:{name: req.body.name,  city: req.body.city}},
    {upsert:true},
    function(err,newBook){
        if(!err){
            res.send(`updated id:${req.params.id}`);
            console.log(`updated id:${req.params.id}`);
        }else{
            console.log("Error");
        }
    });
});

//For Deleting the data 
app.delete('/books/:id',function(req,res){
    Book.findOneAndRemove({
        _id:req.params.id
    },function(err,book){
        if(!err){
            console.log("item deleted")
            res.send("item deleted")
        }else{
            console.log("Error  in delete");
            res.send("error in delete")
        }
    });
});


const PORT = 3001;

app.listen(PORT,function(){
    console.log(`Server Running on port : http://localhost:${PORT}`)
})