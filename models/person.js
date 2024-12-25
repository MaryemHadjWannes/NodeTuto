const mongoose = require('mongoose');

const Person = mongoose.model('Person' , {

    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    }

})

module.exports = Person;