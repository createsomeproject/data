const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const ConnectionDb = require("./connection/database");
const AuthRoute = require('./routes/AuthRoute')
const UsersRoute = require('./routes/UsersRoute')
const PostRoute = require('./routes/PostRoute')
const CategoryRoute = require('./routes/CategoryRoute')

app.use(bodyParser.json());
app.use(express.json())

app.use('/auth',AuthRoute)
app.use('/users',UsersRoute)
app.use('/post',PostRoute)
app.use('/category',CategoryRoute)

const StartConnection = async () => {
  try {
    await ConnectionDb(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`App Serving On Port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

StartConnection()