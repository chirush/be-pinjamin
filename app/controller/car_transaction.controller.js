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
    //Mergin value of date and time
  	const datetime = req.body.date+" "+req.body.time;

    //Storing data to Car Transaction
    const car_transaction = await CarTransaction.query().insert({
      user_id: req.user.id,
      datetime_start: datetime,
      destination: req.body.destination,
      description: req.body.description,
      passanger: req.body.passanger,
      passanger_description: req.body.passanger_description,
      driver: req.body.driver,
      driver_id: req.body.driver_id,
      car_id: req.body.car_id,
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
    //Declaring datetime taken and datetime return
    let datetime_taken = "";
    let datetime_return = "";

    //Checking if theres value on time_taken
    if(req.body.time_taken){
      //Merging value of date and time_taken
      datetime_taken = req.body.date+" "+req.body.time_taken;
    }

    //Checking if theres value on time_return
    if(req.body.time_return){
      //Merging value of date and time_return
      datetime_return = req.body.date+" "+req.body.time_return;
    }

    //Updating the car transaction
    const car_transaction = await CarTransaction.query()
      .findById(req.params.id)
      .patch({
        datetime_taken: datetime_taken,
        datetime_return: datetime_return,
        driver: req.body.driver,
        driver_id: req.body.driver_id,
        car_id: req.body.car_id,
        status: req.body.status,
        confirmation_note: req.body.confirmation_note,
      });

      //Checking if theres picture
      if(req.files.picture[0].filename){
        await CarTransaction.query()
          .findById(req.params.id)
          .patch({
            picture: req.files.picture[0].filename,
          });
      }

      //Checking if theres driving license picture
      if(req.files.driving_license[0].filename){
        await CarTransaction.query()
          .findById(req.params.id)
          .patch({
            driving_license: req.files.driving_license[0].filename,
          });
      }

    //4 Different message will show based on the choosen status
    if(req.body.status == "Ditolak"){
      res.status(200).json({
        status: 200,
        message: "Peminjaman mobil telah ditolak!",
        data: car_transaction,
      });
    }else if(req.body.status == "Diterima"){
      res.status(200).json({
        status: 200,
        message: "Peminjaman mobil telah diterima!",
        data: car_transaction,
      });
    }else if(req.body.status == "Digunakan"){
      res.status(200).json({
        status: 200,
        message: "Mobil telah diterima!",
        data: car_transaction,
      });
    }else if(req.body.status == "Selesai"){
      res.status(200).json({
        status: 200,
        message: "Peminjaman mobil telah selesai!",
        data: car_transaction,
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
