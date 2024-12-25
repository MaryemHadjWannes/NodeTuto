const mongoose = require('mongoose');

const Book = mongoose.model('Book' , {

    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
    
})


module.exports = Book;
