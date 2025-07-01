1. const bodyParser= require('body-parser');  // [deprecated], use express.json() instead

   ### USAGE-- app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
   ### Also this is used to parse the body of the request and make it available in req.body

2. For routing, use the `express.Router()` method to create modular, mountable route handlers.

   ### USAGE-- const router = express.Router();
   ### router.get('/path', (req, res) => { ... });
   ### app.use('/api', router); // Mount the router on a path
   "#####" For specific user acccess like host, client, admin, etc., you can create different routers and mount them accordingly.
   ### Example: app.use('/host', hostRouter);  // hostRouter handles routes for the host
   ### Example: app.use('/client', userRouter); // userRouter handles routes for the client
   ###  Create separate files for each router under 'routes' directory to keep your code organized and export them using module.exports.

3. Use `express.static()` to serve static files such as images, CSS files, and JavaScript files.
   ### USAGE-- app.use(express.static('public')); // Serves files from the 'public' directory

4. Use `express.json()` to parse JSON bodies of incoming requests.
   ### USAGE-- app.use(express.json()); // Parses JSON bodies and makes them available in req.body

5. Now,Each HTML file should be placed in the 'views' directory, and  USE them in js file using 'path' module.
   ### USAGE-- const path = require('path');
   ### app.get('/path', (req, res) => {
   ###     res.sendFile(path.join(__dirname, 'views', 'file.html')); // Sends the HTML file as a response
   ### });

   "#####" Also we can use root directory to serve HTML files
   ### USAGE-- const rootDir = path.dirname(require.main.filename);  //make a separate js file and export the rootDir variable.
   ### app.get('/path', (req, res) => {
   ###     res.sendFile(path.join(rootDir, 'views', 'file.html')); // Sends the HTML file as a response
   ### });

6. To send response status we can use
   ### res.status(404).sendFile()   // Example