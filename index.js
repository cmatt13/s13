const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = 4000;

// pase your mongodb connection string to the connect() method of mongoose module
// change <password> to your db password
mongoose.connect("mongodb+srv://admin:admin123@mycluster.du705if.mongodb.net/pcco107_todoList123?retryWrites=true&w=majority",

	{

		useNewUrlParser: true,
		useUnifiedTopology: true

	}

);

// notifications if connection to db is success or failed:
let db = mongoose.connection;
// console.error.bind(console, <message>) - it prints error in both terminal and browser

db.on("error", console.error.bind(console,"Connection Error."));

// output a message in terminal if the connection is successful
db.once("open", () => console.log("Connected to MongoDB."));

app.get('/hello', (req, res) => {
	res.send("Hello from our new Express API!")
})

// Middleware - middleware in express.js context, are methods, functions that acts and adds features to your application
// handle json data from our client 
app.use(express.json())

const taskRoutes = require('./routes/taskRoutes');
console.log(taskRoutes);
// middleware to group all of our routes starting their endpoints with /tasks
app.use('/', taskRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => console.log(`Server is running at port ${port}`))