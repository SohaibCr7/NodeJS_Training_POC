const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const errorController = require('./controllers/error');

const app = express();
const sequelizeDb = require("./util/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Routes
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

sequelizeDb.sync().then((result) => { 
  console.log('Database is connected')
}).catch((err) => {
  console.log(err)
})

app.listen(8000, () => {
  console.log("Server is running on Port 8000");
});
// app.use(errorController.get404Page);


