const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString
} = graphql;




//fields contain the async function which return a object
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLString
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
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                //write code to extract the data from the db
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})