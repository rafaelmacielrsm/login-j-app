/* eslint no-console: 0 */

const options = {
  root: __dirname + '/static/',
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8',
  }
};

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    
    const server = express();

    server.get('/', ( req,res ) => {
      res.redirect('/login');
    });

    server.get('/robots.txt', ( req,res ) => {
      res.status(200).sendFile('robots.txt', options);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen( 3000, ( err ) => {
      if( err ) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(( ex ) => {
    console.error(ex.stack);
    process.exit(1);
  });