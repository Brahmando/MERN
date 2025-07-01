1. To serve static files like images and CSS in your server, create a folder named `Public` in your project directory.

2. Next, use `express.static(...)` to serve files from the `Public` folder. Use `path.join(__dirname, 'Public')` to specify the absolute path.

3. We need to use 'app.use' to use the static files in the server.
   example: 
   ```javascript
   app.use(express.static(path.join(__dirname, 'Public')));
   ```
4. We can use 'app.get' to send the static files to the browser.
   example:
   ```javascript
   app.get('/', (req, res) => {
       res.sendFile(path.join(__dirname, 'Public', 'index.html'));
   });
   ```
5. To use EJS as a template engine, we need to set it up in the Express app.
   example:
   ```javascript
   app.set('view engine', 'ejs');
   app.set('views', path.join(__dirname, 'views'));
   ```
6. To render an EJS template, we can use 'res.render(...)' method.
   example:
   ```javascript
   app.get('/about', (req, res) => {
       res.render('about', { title: 'About Us' });
   });
   ```
7. To pass data to the EJS template, we can use an object as the second argument in 'res.render(...)'.
   example:
   ```javascript
   app.get('/contact', (req, res) => {
       res.render('contact', { title: 'Contact Us', email: 'contact@example.com' });
   });

   This helps in rendering dynamic content in the EJS templates.
   ```
8. To create a new EJS template, create a new file with the `.ejs` extension in the `views` folder.
   