const graphql = require('graphql');
const _ = require('lodash');

//Diff between GraphQLID and GraphQLString is String takes always the string where the ID takes number, string etc
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;


//FakeData
var books = [{
        id: '1',
        name: 'The jungle Book',
        genre: 'Nature',
        authorId : '1'
    },
    {
        id: '2',
        name: 'The Harry Potter Book',
        genre: 'Fantasy',
        authorId : '2'
    },
    {
        id: '3',
        name: 'Inception',
        genre: 'Action in Dreams',
        authorId : '3'
    }
]

var authors = [{
    id: '1',
    name: "MS Dhoni",
    age: 36 
}, {
    id: '2',
    name: "Sachin Tendulkar",
    age: 42
}, {
    id: '3',
    name: "Viraat Kohli",
    age: 29
}]
//fields contain the async function which return a object
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author : {
            type : AuthorType,
            resolve(parent,args){
                return _.find(authors,{id : parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        }
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //write code to extract the data from the db
                return _.find(books, {
                    id: args.id
                });
            }
        },
        author :{
            type : AuthorType,
            args :{
                id : {
                    type :GraphQLString
                }
            },
            resolve(parent,args){
                return _.find(authors,{
                    id : args.id
                });
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})