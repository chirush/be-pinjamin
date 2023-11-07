const Car = require("../model/cars.model");

const index = async (req, res) => {
  try {
    const cars = await Car.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: cars,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  try {
    let licenseCheck = await Car.query().where("license", req.body.license).first();
    if (licenseCheck) {
      return res.status(400).json({
        status: 400,
        message: "License has already registered!",
      });
    }

    const car = await Car.query().insert({
      brand: req.body.brand,
      type: req.body.type,
      license: req.body.license,
    });

    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: car,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const show = async (req, res) => {
  try {
    const car = await Car.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: car,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const update = async (req, res) => {
  try {
    const car = await Car.query()
      .findById(req.params.id)
      .patch({
        brand: req.body.brand,
        type: req.body.type,
        license: req.body.license,
      });

    res.status(200).json({
      status: 200,
      message: "Success update!",
      data: car,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const car = await Car.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: car,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const detail = async (req, res) => {
  try {
    const carid = req.car.id;
    const cars = await Car.query().where('id', carid);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: cars,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  index,
  store,
  show,
  update,
  destroy,
  detail,
};
