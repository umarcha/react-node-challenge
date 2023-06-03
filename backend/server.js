 // Requiring the module
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const noteRouter = require('./routes/notesRoute');


const app = express();

var corsOptions = {
  origin: '*',
};


app.use(bodyParser.json({ limit: '500mb' }));
app.use(express.urlencoded({ extended: false, limit: '500mb' }));
app.use(cors(corsOptions));
app.use(express.json());



// Route handling
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Haris coder application.' });
});


app.use('/api/v1',authRouter) ;
app.use("/api/v1/note", noteRouter);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
