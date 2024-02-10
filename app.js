const express = require("express");
const apiRoutes = require('./routes/routes.js');
const app = express();
const port = 3000;
const { sequelize } = require("./database/db.js");



app.use(express.json());
app.use('/', apiRoutes);

// Validate and connect to the database
sequelize.authenticate()
    .then(() => console.log('Successfully connected to `Todo task DB`!'))
    .catch((error) => console.log('Failed to connect `Todo task DB`:', error))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
