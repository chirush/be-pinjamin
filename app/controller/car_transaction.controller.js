const CarTransaction = require("../model/car_transactions.model");
const Driver = require("../model/drivers.model");

const index = async (req, res) => {
  try {
    //Retreiving user role
    const user_role = req.user.role;
    let car_transactions = [];

    //The data will shown based on role
    if (user_role == "User"){
      const user_id = req.user.id;
      car_transactions = await CarTransaction.query().where('user_id', user_id).orderBy('id', 'desc');
    }else{
      car_transactions = await CarTransaction.query().orderBy('id', 'desc');
    }

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

const showByStatus = async (req, res) => {
  try {
    //Retreiving user role
    const user_role = req.user.role;
    let car_transactions = [];

    //Retreiving status on parameters
    const status = req.params.status;

    //The data will shown based on role
    if (user_role == "User"){
      const user_id = req.user.id;
      car_transactions = await CarTransaction.query().where('user_id', user_id).where('status', status).orderBy('id', 'desc');
    }else{
      car_transactions = await CarTransaction.query().where('status', status).orderBy('id', 'desc');
    }

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
    //Merging value of date and time
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

    //Changing driver availability if the user use driver
    if (req.body.driver_id){
      const driver = await Driver.query()
        .findById(req.body.driver_id)
        .patch({
          availability: "0",
        });
    }

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
    //Mergin value of date and time
    const datetime_start = req.body.date+" "+req.body.time;

    //Updating the Car Transaction
    const car_transaction = await CarTransaction.query()
      .findById(req.params.id)
      .patch({
        datetime_start: datetime_start,
        destination: req.body.destination,
        description: req.body.description,
        passanger: parseInt(req.body.passanger),
        passanger_description: req.body.passanger_description,
        driver: req.body.driver,
        driver_id: req.body.driver_id,
        car_id: parseInt(req.body.car_id),
        status: req.body.status,
        confirmation_note: req.body.confirmation_note,
      });

    //Changing driver availability based on status
    if (req.body.driver_id){
      if (req.body.status == "Selesai" || req.body.status == "Ditolak"){
        const driver = await Driver.query()
          .findById(req.body.driver_id)
          .patch({
            availability: "1",
          });
      }else{
        const driver = await Driver.query()
          .findById(req.body.driver_id)
          .patch({
            availability: "0",
          });
      }
    }

    //Declaring current datetime and convert it to string with timezone GMT+7
    const current_datetime = new Date();
    const current_datetime_string = new Date(current_datetime.getTime() + (7*60) * 60000).toISOString()

    //Removing the time from current_datetime
    const current_date = current_datetime_string.split('T')[0];

    //Checking if theres value on time_taken
    if(req.body.time_taken){
      //Merging value of date and time_taken
      const datetime_taken = current_date+" "+req.body.time_taken;

      //Updating the Car Transation
      await CarTransaction.query()
        .findById(req.params.id)
        .patch({
          datetime_taken: datetime_taken,
        });
    }

    //Checking if theres value on time_return
    if(req.body.time_return){
      //Merging value of date and time_return
      const datetime_return = current_date+" "+req.body.time_return;

      //Updating the Car Transation
      await CarTransaction.query()
        .findById(req.params.id)
        .patch({
          datetime_return: datetime_return,
        });
    }

    //Checking if theres picture
    if(req.file){
      //Updating the Car Transation
      await CarTransaction.query()
        .findById(req.params.id)
        .patch({
          picture: req.files.picture[0].filename,
          driving_license: req.files.driving_license[0].filename,
        });
    }

    const car_transaction_data = await CarTransaction.query().findById(req.params.id)

    //4 Different message will show based on the choosen status
    if(req.body.status == "Ditolak"){
      res.status(200).json({
        status: 200,
        message: "Peminjaman mobil telah ditolak!",
        data: car_transaction_data,
      });
    }else if(req.body.status == "Diterima"){
      res.status(200).json({
        status: 200,
        message: "Peminjaman mobil telah diterima!",
        data: car_transaction_data,
      });
    }else if(req.body.status == "Digunakan"){
      res.status(200).json({
        status: 200,
        message: "Mobil telah diambil!",
        data: car_transaction_data,
      });
    }else if(req.body.status == "Selesai"){
      res.status(200).json({
        status: 200,
        message: "Peminjaman mobil telah selesai!",
        data: car_transaction_data,
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
  showByStatus,
  index,
  store,
  show,
  update,
  destroy,
};
