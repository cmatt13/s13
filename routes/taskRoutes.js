const express = require('express');
// Router() from express, allow us to access the HTTP methods routes
// Router() will act as a middle ware and our routing system
const router = express.Router();
// Routes should only be concerned with our endpoints and our methods
// The action to be done once a route is accesses should be in separate file, it should be in our controllers
const taskControllers = require('../controllers/taskControllers');
const {createTaskController, getAllTasksController, getSingleTaskController} = taskControllers
const User = require('../models/User');

router.post('/', createTaskController);

router.get('/', getAllTasksController);
/*
	Mini-Activity

	Create a new route and controller to get a sintle item from our db based on its id.

	Create a new route and add a route parameter called id in the endpoint to be able to pass url params
			Create a new controller which is able to get the id from the url through the use of req.params.
				Add a findById method from the Task model as pass the id from req.params as its argument
				Then pass the result to the client.
				Catch the error and pass the error to the client.


*/

router.post('/users', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (err, existingUser) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server Error!' });
    }

    if (existingUser) {
      return res.status(400).json({ error: 'Duplicate Username Found!' });
    }

    });
  });


router.get('/:id', getSingleTaskController);

// router hold all of our routes and can be exported and imported into another fie
module.exports = router;