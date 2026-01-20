const app = require('./app');

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// This conditional is here for testing purposes:
if (require.main === module) { 
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}