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
    const existing_transaction = await RoomTransaction.query().where('date', req.body.date).where('status', 'Diterima').select('time_start', 'time_end');

    const time_start = new Date(req.body.date+"T"+req.body.time_start);
    const time_end = new Date(req.body.date+"T"+req.body.time_end);

    for (const item of existing_transaction) {
      const existing_time_start = new Date(req.body.date+"T"+item.time_start);
      const existing_time_end = new Date(req.body.date+"T"+item.time_end);

      if ((time_start >= existing_time_start && time_start < existing_time_end) || (time_end > existing_time_start && time_end <= existing_time_end) || (time_start <= existing_time_start && time_end >= existing_time_end)) {
        return res.status(400).json({
          status: 400,
          message: "Pengajuan peminjaman ruangan gagal. Seseorang telah meminjam ruangan di jam tersebut!",
        });
      }
    }

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
      message: "Pengajuan peminjaman ruangan berhasil!",
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
    if(req.body.status == "Diterima"){
      const existing_transaction = await RoomTransaction.query().where('date', req.body.date).where('status', 'Diterima').select('time_start', 'time_end');

      const time_start = new Date(req.body.date+"T"+req.body.time_start);
      const time_end = new Date(req.body.date+"T"+req.body.time_end);

      for (const item of existing_transaction) {
        const existing_time_start = new Date(req.body.date+"T"+item.time_start);
        const existing_time_end = new Date(req.body.date+"T"+item.time_end);

        if ((time_start >= existing_time_start && time_start < existing_time_end) || (time_end > existing_time_start && time_end <= existing_time_end) || (time_start <= existing_time_start && time_end >= existing_time_end)) {
          return res.status(400).json({
            status: 400,
            message: "Penerimaan peminjaman ruangan gagal. Seseorang telah meminjam ruangan di jam tersebut!",
          });
        }
      }
    }

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
