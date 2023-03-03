"use strict";

var Sequelize = require("sequelize");

var sequelize = new Sequelize("leather-o-city", "root", "helloworld", {
  dialect: "mysql",
  host: "localhost",
  logging: false
});
module.exports = sequelize;