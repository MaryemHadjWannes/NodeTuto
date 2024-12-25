const express = require('express');
const Person = require('../models/person');
const router = express.Router();

const bcrypt = require('bcrypt');




router.post('/register', async (req, res)=>{

    data = req.body;

    person = new Person(data);
    
    salt = bcrypt.genSaltSync(10);
    cryptedPassword = await bcrypt.hashSync(data.password, salt);

    person.password = cryptedPassword;
    
    person.save()
        .then(
            (savedPerson)=>{
                res.send(savedPerson)
            }

        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})

const jwt = require('jsonwebtoken');

router.post('/login', async (req , res)=>{

    data = req.body;

    person = await Person.findOne({email: data.email})

    if(!person){
        res.status(404).send('email or password invalid !')
    }else{
        validPassword = bcrypt.compareSync(data.password, person.password)
        
        if(!validPassword){
            res.status(401).send('email or password invalid !')
        }else{
            payload = {
                _id: person._id,
                email: person.email,
                firstname: person.firstname
            }
            token = jwt.sign( payload , '12345' )

            res.status(200).send({mytoken: token})
        }
    }
})

/*
router.post( '/add', (req , res)=>{

    data = req.body;

    person = new Person(data);

    person.save()
        .then(
            (savedPerson)=>{
                res.send(savedPerson)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})*/

router.post( '/create', async (req , res)=>{

    try{
        data = req.body;
        person = new Person(data);

        savedPerson = await person.save();

        res.send(savedPerson)


    }catch(error){
        res.send(error)
    }
})

router.get ( '/getall', (req , res)=>{

    Person.find()
        .then(
            (people)=>{
                res.send(people);
            }        
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})

router.get ( '/getall2', async (req , res)=>{

    try{
        people = await Person.find({age : 25});
        res.send(people);


    }catch (error){
        res.send(error)
    }
})

router.get ( '/getbyid/:id', async (req , res)=>{

    myid = req.params.id;

    Person.findOne({_id: myid})
        .then(
            (person)=>{
                res.send(person)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})

router.get ( '/getbyid2/:id', async (req , res)=>{
    try{

    myid = req.params.id;

    person = await Person.findOne({_id: myid})

    res.send(person);
    
    }catch(error){
        res.send(error)
    } 

})

router.delete( '/delete/:id', (req , res)=>{

    myid = req.params.id

    Person.findOneAndDelete({ _id: myid})
        .then(
            (deletedPerson)=>{
                res.send(deletedPerson)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
    
} )

router.delete( '/delete2/:id', async (req , res)=>{

    try{
        myid = req.params.id

        person = await Person.findOneAndDelete({ _id: myid})
        
        res.send(person)

    }catch(error){
        res.send(error)
    }            
} )

router.put( '/update/:id', (req , res)=>{

    id = req.params.id;

    newData = req.body;

    Person.findByIdAndUpdate({ _id: id} , newData)
        .then(
            (updated)=>{
                res.send(updated)
            }
                
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
})

router.put( '/update2/:id', async (req , res)=>{

    try{
        id = req.params.id;

        newData = req.body;

        updated = await Person.findByIdAndUpdate({ _id: id} , newData)
        
        res.status(200).send(updated)
    
    }catch(error){
        res.status(400).send(error)
    }     
})

module.exports = router;