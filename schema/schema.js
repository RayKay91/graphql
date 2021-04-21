const graphql = require( 'graphql' )

const books = [ { id: '1', name: 'Harry Potter and goblet of fire', genre: 'fiction', authorID: '1' }, { id: '2', name: 'Lord Of The Rings', genre: 'fantasy', authorID: '2' }, { id: '3', name: 'The Hobbit', genre: 'fantasy', authorID: '2' }, { id: '4', name: 'Harry pooter', genre: 'fiction', authorID: '1' } ]

const authors = [ { id: '1', name: 'J K Rowling' }, { id: '2', name: 'J R Tolkien' } ]


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql

const BookType = new GraphQLObjectType( {
    name: 'Book',
    fields: () => {
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            genre: { type: GraphQLString },
            author: {
                type: AuthorType,
                resolve( parent, args ) {
                    return authors.find( item => item.id === parent.authorID )
                }
            }
        }
    }
} )

const AuthorType = new GraphQLObjectType( {
    name: 'Author',
    fields: () => {
        return {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            books: {
                type: new GraphQLList( BookType ),
                resolve( parent, args ) {
                    return books.filter( book => book.authorID === parent.id )
                }
            }
        }
    }
} )


const RootQuery = new GraphQLObjectType( {
    name: 'RootQueryType',
    fields: {
        book: { // the key here is what will be used to make the query on the front end.
            type: BookType,
            args: { id: { type: GraphQLID } }, // specify any arguments that the front end should pass in as well its type. Here, there is only one argument being requested which is id.
            resolve( parent, args ) {
                //code to get data from db / other source you have access to the arguments by accessing them via dot notation. e.g. args.id

                const d = books.filter( book => book.id === args.id )
                console.log( d )
                return d[ 0 ]
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve( parent, args ) {
                return authors.find( item => item.id === args.id ) // .find() doesn't return an array
            }
        }

    }
} )

module.exports = new GraphQLSchema( {
    query: RootQuery
} )