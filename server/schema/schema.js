const graphql = require('graphql');
const _=require('lodash');

//Diff between GraphQLID and GraphQLString is String takes always the string where the ID takes number, string etc
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql;


//FakeData
var books = [{
        id: '1',
        name: 'The jungle Book',
        genre: 'Nature'
    },
    {
        id: '2',
        name: 'The Harry Potter Book',
        genre: 'Fantasy'
    },
    {
        id: '3',
        name: 'Inception',
        genre: 'Action in Dreams'
    }
]

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
        }
    })
});

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
                return _.find(books,{id : args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})