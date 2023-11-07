const RoomTransaction = require("../model/room_transactions.model");

const index = async (req, res) => {
  try {
    const room_transactions = await RoomTransaction.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: room_transactions,
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
  	const duration = req.body.duration;

    const room_transaction = await RoomTransaction.query().insert({
      name: req.body.name,
      phone: req.body.phone,
      room_id: req.body.room_id,
      datetime_start: req.body.datetime_start,
      description: req.body.description,
      status: "Pending",
    });

    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: room_transaction,
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
    const room_transaction = await RoomTransaction.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: room_transaction,
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
    const room_transaction = await RoomTransaction.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name,
      });

    res.status(200).json({
      status: 200,
      message: "Success update!",
      data: room_transaction,
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
    const room_transaction = await RoomTransaction.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: room_transaction,
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
    const room_transactionid = req.room_transaction.id;
    const room_transactions = await RoomTransaction.query().where('id', room_transactionid);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: room_transactions,
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
