const CarTransaction = require("../model/car_transactions.model");

const index = async (req, res) => {
  try {
    const car_transactions = await CarTransaction.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: car_transactions,
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
  	const datetime = new Date(req.body.date+" "+req.body.time);

    const car_transaction = await CarTransaction.query().insert({
      user_id: req.user.id,
      datetime_start: datetime,
      time_start: req.body.time_start,
      time_end: req.body.time_end,
      event: req.body.event,
      description: req.body.description,
      participant: req.body.participant,
      consumption: req.body.consumption,
      note: req.body.note,
      status: req.body.status,
      confirmation_note: req.body.confirmation_note,
    });

    res.status(200).json({
      status: 200,
      message: "Pengajuan peminjaman mobil berhasil!",
      data: car_transaction,
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
    const car_transaction = await CarTransaction.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: car_transaction,
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
    //Checking if the car has been booked or not
    if(req.body.status == "Diterima"){
      //Checking if theres any car that has been booked based on the requested date
      const existing_transaction = await CarTransaction.query().where('date', req.body.date).where('status', 'Diterima').where('car_id', req.body.car_id).select('time_start', 'time_end');

      //Declaring the time that has been requested to datetime
      const time_start = new Date(req.body.date+"T"+req.body.time_start);
      const time_end = new Date(req.body.date+"T"+req.body.time_end);

      for (const item of existing_transaction){
        //Declaring the time that has been booked to datetime
        const existing_time_start = new Date(req.body.date+"T"+item.time_start);
        const existing_time_end = new Date(req.body.date+"T"+item.time_end);

        //Checking if theres any time conflict with the existing transaction
        if ((time_start >= existing_time_start && time_start < existing_time_end) || (time_end > existing_time_start && time_end <= existing_time_end) || (time_start <= existing_time_start && time_end >= existing_time_end)) {
          return res.status(400).json({
            status: 400,
            message: "Penerimaan peminjaman mobil gagal. Seseorang telah meminjam mobil di jam tersebut!",
          });
        }
      }
    }

    //Updating the car transaction
    const car_confirmation = await CarTransaction.query()
      .findById(req.params.id)
      .patch({
        car_id: req.body.car_id,
        date: req.body.date,
        time_start: req.body.time_start,
        time_end: req.body.time_end,
        status: req.body.status,
        confirmation_note: req.body.confirmation_note,
      });

    //2 Different message will show based on the choosen status
    if(req.body.status == "Ditolak"){
      res.status(200).json({
        status: 200,
        message: "Peminjaman mobil telah ditolak!",
        data: car_confirmation,
      });
    }else{
      res.status(200).json({
        status: 200,
        message: "Peminjaman mobil telah diterima!",
        data: car_confirmation,
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
    const car_transaction = await CarTransaction.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Peminjaman mobil telah dihapus!",
      data: car_transaction,
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
};
