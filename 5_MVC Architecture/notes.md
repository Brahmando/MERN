MVC Architecture

1. 'Model': The model represents the data and business logic of the application. It is responsible for managing the data, including retrieving it from the database, validating it, and applying business rules. In our case, the `userContact` class serves as the model.

WE BASICALLY CREATED MODELS WHRE WE USED CLASSES TO DEFINE THE STRUCTURE OF OUR DATA,Example: 
```javascript
class userContact {
    constructor(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }

    save() {
      const database = []; //Fake Database
      database.push(this);
      console.log("Contact information saved:", this);
        // Logic to save contact information to the database
    }
}
```
------------------------------------------------------------------------------------------------------------------------

2. 'View': The view is responsible for rendering the user interface and presenting the data to the user. In our application, the EJS templates (e.g., `submit-form.ejs`) act as the views.

*** WE CREATE DYNAMIC 'EJS' FILES HERE FOR THE VIEWS OR USER INTERFACE AND 'PARTIALS' WHICH ARE USED FOR REUSABILITY ***


------------------------------------------------------------------------------------------------------------------------


3. 'Controller': The controller acts as an intermediary between the model and the view. It processes user input, interacts with the model to retrieve or update data, and selects the appropriate view for rendering. In our case, the `contactControl.js` file contains the controller logic.

 HERE, WE JUST KEEP THE LOGIC OR METHODS OR FUNCTIONS THAT HANDLE THE USER INPUT AND INTERACT WITH THE MODEL,Example:
```javascript
const userContact = require('../models/userContact');
const contactControl = {
    submitForm: (req, res) => {
        const { name, email, message } = req.body;
        const contact = new userContact(name, email, message);
        contact.save();
        res.render('success', { name });
    }
};

WE TRY TO OFFLOAD THE LOGIC FROM THE ROUTES TO THE CONTROLLER, SO THAT THE ROUTES JUST HANDLE THE REQUESTS AND RESPONSES, AND THE CONTROLLER HANDLES THE BUSINESS LOGIC.
```
AND ROUTES ARE PART OF THE CONTROLLER, WHERE WE DEFINE THE ENDPOINTS AND MAP THEM TO THE CONTROLLER ACTIONS,Example:
```javascript
const express = require('express');
const contactControl = require('../controllers/contactControl');
const router = express.Router();

router.post('/submit', contactControl.submitForm);

module.exports = router;


------------------------------------------------------------------------------------------------------------------------



4. 'Routes': The routes define the endpoints of the application and map them to the appropriate controller actions. In our case, the `contactRoutes.js` file defines the routes for handling contact form submissions.
5. 'Middleware': Middleware functions are used to handle requests and responses in the application. They can perform tasks such as logging, authentication, and error handling. In our case, the `contactMiddleware.js` file contains middleware functions that validate the contact form data before it reaches the controller.
6. 'Database': The database is where the application's data is stored. In our case, we are using MongoDB to store user contact information.


----------------------------------------------------------------------------------------------------------------------------------------------
### MVC Architecture Overview
In the MVC architecture, we separate the application into four main components: Models, Views, Controllers, and Routes. This separation of concerns allows for better organization, maintainability, and scalability of the application.
### MVC Architecture Components

*** In 'Models', we define the data structure and business logic. In our case, the `userContact` class is defined in the `models/userContact.js` file. It includes properties such as `name`, `email`, `message`, and methods for saving the contact information to the database.
In the 'Views', we create the user interface using EJS templates. The `submit-form.ejs` file is an example of a view that renders the contact form for users to fill out.
In the 'Controllers', we define the logic for handling user input and interacting with the model. The `contactControl.js` file contains functions that process the contact form submission, validate the data, and save it to the database.
In the 'Routes', we define the endpoints for the application and map them to the appropriate controller actions. The `contactRoutes.js` file defines routes for handling contact form submissions, such as displaying the form and processing the submitted data.
### MVC Architecture Flow
1. **User Interaction**: The user interacts with the application by filling out the contact form in the view.
2. **Controller Action**: When the user submits the form, the request is sent to the server, and the appropriate controller action is triggered based on the route defined in `contactRoutes.js`.
3. **Model Interaction**: The controller interacts with the model (`userContact`) to validate and save the contact information to the database.
4. **Response Rendering**: After processing the request, the controller selects the appropriate view to render the response. In our case, it may redirect the user to a success page or display an error message if validation fails.
5. **Middleware Processing**: Before reaching the controller, the request may pass through middleware functions defined in `contactMiddleware.js`. These functions can perform tasks such as validating the contact form data or logging requests.
### Benefits of MVC Architecture
- **Separation of Concerns**: Each component has a specific responsibility, making the codebase easier to understand and maintain.
- **Scalability**: The architecture allows for easy addition of new features or modifications without affecting other components.
- **Testability**: Each component can be tested independently, improving the overall quality of the application.
- **Reusability**: Components can be reused across different parts of the application or in other projects.
### Conclusion
The MVC architecture provides a structured approach to building web applications by separating concerns into Models, Views, Controllers, and Routes. This organization enhances maintainability, scalability, and testability of the application. By following the MVC pattern, developers can create robust and efficient applications that are easier to manage and extend over time.
### Additional Components in MVC Architecture
- **Middleware**: Middleware functions are used to handle requests and responses in the application. They can perform tasks such as logging, authentication, and error handling. In our case, the `contactMiddleware.js` file contains middleware functions that validate the contact form data before it reaches the controller.
- **Database**: The database is where the application's data is stored. In our case, we are using MongoDB to store user contact information. The model interacts with the database to perform CRUD (Create, Read, Update, Delete) operations on the data.
- **Configuration**: Configuration files are used to manage application settings, such as database connections, server ports, and environment variables. In our case, the `config.js` file contains configuration settings for the application.
### Summary
The MVC architecture provides a structured approach to building web applications by separating concerns into Models, Views, Controllers, and Routes. This organization enhances maintainability, scalability, and testability of the application. By following the MVC pattern, developers can create robust and efficient applications that are easier to manage and extend over time.