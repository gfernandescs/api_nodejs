const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./app/controllers/authController')(app);
require('./app/controllers/userController')(app);

app.listen(port, function() {
    console.log('Server started on port: ' + port);
});