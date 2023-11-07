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
    const room_transaction = await RoomTransaction.query().insert({
      user_id: req.user.id,
      room_id: req.body.room_id,
      date: req.body.date,
      time_start: req.body.time_start,
      time_end: req.body.time_end,
      event: req.body.event,
      description: req.body.description,
      participant: req.body.participant,
      consumption: req.body.consumption,
      note: req.body.note,
      status: "Dicek",
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

const confirmation = async (req, res) => {
  try {
    const room_confirmation = await RoomTransaction.query()
      .findById(req.params.id)
      .patch({
        room_id: req.body.room_id,
        date: req.body.date,
        time_start: req.body.time_start,
        time_end: req.body.time_end,
        status: req.body.status,
      });

    if(req.body.status == "Ditolak"){
      res.status(200).json({
        status: 200,
        message: "Peminjaman ruangan telah ditolak!",
        data: room_confirmation,
      });
    }else{
      res.status(200).json({
        status: 200,
        message: "Peminjaman ruangan telah diterima!",
        data: room_confirmation,
      });
    }
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
  confirmation,
  destroy,
  detail,
};
