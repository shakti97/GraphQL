const express=require('express');
const graphqlHTTP=require('express-graphql');
const app=express();
const schema=require('./schema/schema.js');

//whenever hit the graphql route it passes it to handle the graphqlHTTP to handle the graphql req
app.use('/graphql',graphqlHTTP({

}));


app.listen(8080,()=>{
    console.log('Server Started');
})