// import Task Model
const Task = require('../models/Task');

module.exports.createTaskController = (req, res) => {
	console.log(req.body);
	// Create a new Task Document
		/*
			- check if there is a document with duplicate name field
			- model.findOne() is mongoose method similar to findOne MongoDB, however, with Model.findOne(), we can process the result via our API
			- .then() is able to capture the result of our query
				.then() is able tp process the result and when that result is returned, we can actually add anoter then() to process the next result
			- .catch() is able to capture the error of our query
		*/
	Task.findOne({
		name : req.body.name
	}) .then(result => {
		console.log(result);
		// return null if no documents were found with the name given in the criteria
		// return undefined if there is an error

		// This will allow us to send a message to the client a duplicate document was found
		if(result !== null && result.name === req.body.name){
			return res.send("Duplicate Task Found.")
		} else {
			// created a new task object our of our Task model
			// newTask has added methods for use in our application
			let newTask = new Task({
				name: req.body.name
			})
			// .save() is method from an object created by a model
			// this will then allow us to save our document into our collection
			// .save() can have an anonymous function and this can take 2 parameters
			// the first parementer item: saveErr receives an error object if there was an creating our document
			// the second item is our saved document
			newTask.save()
			.then(result => res.send(result))
			.catch(err => res.send(err))
		}
	})
	.catch(err => res.send(err));
}

module.exports.getAllTasksController = (req,res)=>{

	//Model.find() is a Mongoose method similar to MongoDB's find(). It is able to retrieve all documents that will match the criteria. 
	Task.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));

}

module.exports.getSingleTaskController = (req, res) => {
	console.log(req.params);
	Task.findById(req.params.id, {_id: 0, name: 1})
	.then(result => res.send(result))
	.catch(err => res.send(err))
}

// module.exports.getSingleTaskController = (req, res) => {
// 	console.log(req.params)
// 	Task.findById(req.params.id, {_id: 0, name: 1})
// 	.then(result => res.send(result))
// 	.catch(err => res.send(err))
// }