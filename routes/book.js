const express = require('express');

const router = express.Router();

const Book = require('../models/book');

const multer = require('multer');

filename = '';

const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect)=>{

        let date = Date.now();
        let fl = date + '.' + file.mimetype.split('/')[1];
        redirect(null , fl);
        filename = fl;

    }
})

const upload = multer({storage: mystorage});




//Book crud

router.post( '/createbook', upload.any('image'), async (req , res)=>{

    try{
        data = req.body;
        book = new Book(data);
        this.propfind.image = filename;
        savedBook = await book.save();
        filename = '';

        res.status(200).send(savedBook)


    }catch(error){
        res.status(400).send(error)
    }
})

router.get ( '/getallbooks', async (req , res)=>{

    try{
        books = await Book.find();
        res.status(200).send(books);


    }catch (error){
        res.status(400).send(error)
    }
})

router.delete( '/deletebook/:id', async (req , res)=>{

    try{
        myid = req.params.id

        book = await Book.findOneAndDelete({ _id: myid})
        
        res.status(200).send(book)

    }catch(error){
        res.status(400).send(error)
    }            
} )

router.put( '/updatebook/:id', async (req , res)=>{

    try{
        id = req.params.id;

        newData = req.body;

        updated = await Book.findByIdAndUpdate({ _id: id} , newData)
        
        res.status(200).send(updated)
    
    }catch(error){
        res.status(400).send(error)
    }     
})

module.exports = router;