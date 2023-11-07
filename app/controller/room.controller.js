const Room = require("../model/rooms.model");

const index = async (req, res) => {
  try {
    const rooms = await Room.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: rooms,
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
    const room = await Room.query().insert({
      name: req.body.name,
    });

    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: room,
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
    const room = await Room.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: room,
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
    const room = await Room.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name,
      });

    res.status(200).json({
      status: 200,
      message: "Success update!",
      data: room,
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
    const room = await Room.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: room,
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
    const roomid = req.room.id;
    const rooms = await Room.query().where('id', roomid);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: rooms,
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
