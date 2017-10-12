const path      = require( 'path' );
const express   = require( 'express' );
const app       = express();

const staticPath = path.resolve( __dirname, '../prod' );

app.use( express.static( staticPath ) );

// not found in static files, so default to index.html
app.use( ( req, res ) => res.sendFile( `${staticPath}/index.html` ) );

const port = process.env.PORT || 3000;

app.listen( port, () => {
    console.log( `Example app listening on port ${port}!` );
} );
