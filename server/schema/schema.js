const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/bookschema.js');
const Author = require('../models/authorSchema.js');

//Diff between GraphQLID and GraphQLString is String takes always the string where the ID takes number, string etc
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;


//FakeData
// var books = [{
//         id: '1',
//         name: 'The jungle Book',
//         genre: 'Nature',
//         authorId: '1'
//     },
//     {
//         id: '2',
//         name: 'The Harry Potter Book',
//         genre: 'Fantasy',
//         authorId: '2'
//     },
//     {
//         id: '3',
//         name: 'Inception',
//         genre: 'Action in Dreams',
//         authorId: '3'
//     },
//     {
//         id: '4',
//         name: 'Jumanji',
//         genre: 'Action in Game',
//         authorId: '1'
//     },
//     {
//         id: '5',
//         name: 'Interstellar',
//         genre: 'Sci-fi',
//         authorId: '1'
//     }, 
//     {
//         id: '6',
//         name: 'Half girlfriend',
//         genre: 'Nature',
//         authorId: '2'
//     },
//     {
//         id: '7',
//         name: '2 States',
//         genre: 'Story',
//         authorId: '1'
//     }


// ]

// var authors = [{
//     id: '1',
//     name: "MS Dhoni",
//     age: 36
// }, {
//     id: '2',
//     name: "Sachin Tendulkar",
//     age: 42
// }, {
//     id: '3',
//     name: "Viraat Kohli",
//     age: 29
// }]

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
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId);
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
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({authorId : parent.id});
            }
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
                return Book.findById(args.id)
            //     //write code to extract the data from the db
            //     return _.find(books, {
            //         id: args.id
            //     });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Author.findById(args.id);
            //     return _.find(authors, {
            //         id: args.id
            //     });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type :GraphQLString},
                age: {type : GraphQLInt}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save();
            }
        },
        addBook :{
            type :BookType,
            args:{
                name : {type : GraphQLString},
                genre : {type :GraphQLString},
                authorId:{type :GraphQLID}
            },
            resolve(parent,args){
                let book=new Book({
                    name :args.name,
                    genre : args.genre,
                    authorId :args.authorId
                })
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation :Mutation
})