const AuthRouter = require("./auth");
const UserRouter = require("./user");
const CarRouter = require("./car");
const CarTransactionRouter = require("./car_transaction");
const DriverRouter = require("./driver");
const RoomRouter = require("./room");
const RoomTransactionRouter = require("./room_transaction");

const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, UserRouter);
  app.use(prefix, CarRouter);
  app.use(prefix, CarTransactionRouter);
  app.use(prefix, DriverRouter);
  app.use(prefix, RoomRouter);
  app.use(prefix, RoomTransactionRouter);
};

module.exports = routes;
