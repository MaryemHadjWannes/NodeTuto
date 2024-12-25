const express = require('express');

const personRoute = require('./routes/person');
const bookRoute = require('./routes/book');

require('./config/connect');

const app = express();
app.use(express.json());


app.use('/book', bookRoute);
app.use('/person', personRoute );


app.use('/getimage' , express.static('./uploads'))


app.listen( 3000, ()=>{

    console.log("server is running");

} )




//http://127.0.0.1:3000/
//Crud

/*app.post( '/add2', ()=>{

    console.log('add post request');
})

app.get ( '/getall2', ()=>{

    console.log('add get request');
})

app.put( '/update', ()=>{

    console.log('add update request');
})

app.delete( '/delete', ()=>{

    console.log('add delete request');
} )

*/