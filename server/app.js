const express=require('express');
const graphqlHTTP=require('express-graphql');
const app=express();
const schema=require('./schema/schema.js');

//whenever hit the graphql route it passes it to handle the graphqlHTTP to handle the graphql req
//graphiql is a in-browser tool for writing , testing queries
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql : true
}));


app.listen(8080,()=>{
    console.log('Server Started');
})