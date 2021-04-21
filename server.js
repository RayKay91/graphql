const express = require( 'express' )
const { graphqlHTTP } = require( 'express-graphql' )
const schema = require( './schema/schema' )
const app = express()

const PORT = 3000

app.use( '/graphql', graphqlHTTP( {
    graphiql: true,
    schema
} ) )


app.listen( PORT, () => console.log( 'server listening on port ' + PORT ) )