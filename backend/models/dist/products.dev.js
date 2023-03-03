"use strict";

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../util/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Product = _database["default"].define('product', {
  id: {
    type: _sequelize["default"].INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  price: {
    type: _sequelize["default"].DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: _sequelize["default"].STRING,
    allowNull: false
  },
  description: {
    type: _sequelize["default"].STRING,
    allowNull: false
  }
});

module.exports = Product;