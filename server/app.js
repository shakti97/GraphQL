const express=require('express');
const graphqlHTTP=require('express-graphql');
const app=express();
const schema=require('./schema/schema.js');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
var url= process.env.MONGOLAB_URI;
var options={useNewUrlParser: true}
mongoose.connect(url,options);
mongoose.connection.once('open',()=>{
    console.log('mlab connected');
})

//whenever hit the graphql route it passes it to handle the graphqlHTTP to handle the graphql req
//graphiql is a in-browser tool for writing , testing queries
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql : true
}));


app.listen(8080,()=>{
    console.log('Server Started');
})