const mongoose = require('mongoose');
/*
  Mongoose Schema 
    - Schema, in mongoose context, determine the structure of the documents. 
    - It acts as a blueprint to how data/entries in our collection should look like. 

  
  Note: Gone are the days when worry if entry has 'stock' or 'stocks' as field names. Mongoose itself will notify us and disallow us to create documents that do not match the schema

  Schema() is a constructor from mongoose that will allow us to create a new Schema object


*/
const taskSchema = new mongoose.Schema({
	// define the fields for the task document
	// this task document has a name and status field. 
	// name with the value to be String 
	// status has curly brace because it has defined fiends to follow:
	/*
	   value's type: String,
	   and if not provided a value once the document was created it will default to value:pending
	*/
	name: String,
	status: {
		type: String,
		default: "pending"
	}
});

/*
  Models are used to connet your api to the corresponding collection in your database. 
  It is representation of the Task documents to be created into new tasks collection.

  Models uses schemas to create/instantiate objects that correspond to the schema. By default, when creating the collection from your model, the collection name will be pluralized (ENGLISH ONLY)

  mongoose.model(<nameOfColleectionInAtlas>, <schemaToFollow>)

  Your model have method that will help in querying, creatinbg or even editing your documents. Models are also constructors of your documents. It will then create objects which has their own methods
*/

module.exports = mongoose.model("Task",
	taskSchema);

// module.expoerts will allow us to export file/function/values into another js file within our application
// export the model to other files