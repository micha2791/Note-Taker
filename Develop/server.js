//dependencies
const express = require('express');

//server to the route files
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//express server
const app = express();


//port
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: true }));

//incoming json data
app.use(express.json());

//routes
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});





