const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app;
app.use(bodyParser.json());
app.use(cors());


/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html


// Add middware for parsing request bodies here:


// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
//Use the apiRouter for all routes starting with /api
app.use('/api', apiRouter);


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

}
