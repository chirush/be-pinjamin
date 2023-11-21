const CarTransaction = require("../model/car_transactions.model");
const Driver = require("../model/drivers.model");
const User = require("../model/user.model");
const Notification = require("../model/notifications.model");
const transporter = require("../../config/mailer.js");

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

    console.log(req.user.id);
    console.log(req.body.status);

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

    //Storing notification
    if (req.body.status == "Diterima"){
      const notification = await Notification.query().insert({
        user_id: car_transaction.user_id,
        notification: "Permintaan Peminjaman Mobil ke "+req.body.destination+" telah diterima!",
        type: "car",
        status: "unread",
      });
    }else{
      const notification = await Notification.query().insert({
        user_id: car_transaction.user_id,
        notification: "Permintaan Peminjaman Mobil ke "+req.body.destination+" telah dibuat!",
        type: "car",
        status: "unread",
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
    let date_start = "";
    let time_start = "";


    if(car_transaction.datetime_start){
      const datetime_start = new Date(car_transaction.datetime_start.getTime() + (7*60) * 60000).toISOString()
      date_start = datetime_start.split('T')[0];
      time_start = datetime_start.split('T')[1];
    }

    car_transaction.date_start = date_start;
    car_transaction.time_start = time_start;

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

    const car_transaction_data = await CarTransaction.query().findById(req.params.id);
    const data_user = await User.query().findById(car_transaction_data.user_id);

    //4 Different message will show based on the choosen status
    if(req.body.status == "Ditolak"){
      //Sending notification to email
      const mail_options = {
        from: 'GMedia',
        to: data_user.email,
        subject: 'Permintaan peminjaman mobil telah ditolak',
        html: `Permintaan peminjaman mobil dengan id "${car_transaction_data.id}" telah ditolak.`,
      };

      await transporter.sendMail(mail_options);

      //Create new notification
      const notification = await Notification.query().insert({
        user_id: data_user.id,
        notification: "Permintaan Peminjaman Mobil ke "+req.body.destination+" telah ditolak!",
        type: "car",
        status: "unread",
      });

      res.status(200).json({
        status: 200,
        message: "Permintaan peminjaman mobil telah ditolak!",
        data: car_transaction_data,
      });
    }else if(req.body.status == "Diterima"){
      //Sending notification to email
      const mail_options = {
        from: 'GMedia',
        to: data_user.email,
        subject: 'Permintaan peminjaman mobil telah diterima',
        html: `Permintaan peminjaman mobil dengan id "${car_transaction_data.id}" telah diterima.`,
      };

      await transporter.sendMail(mail_options);

      //Create new notification
      const notification = await Notification.query().insert({
        user_id: data_user.id,
        notification: "Permintaan Peminjaman Mobil ke "+req.body.destination+" telah diterima!",
        type: "car",
        status: "unread",
      });

      res.status(200).json({
        status: 200,
        message: "Permintaan peminjaman mobil telah diterima!",
        data: car_transaction_data,
      });
    }else if(req.body.status == "Digunakan"){
      //Create new notification
      const notification = await Notification.query().insert({
        user_id: data_user.id,
        notification: "Peminjaman Mobil ke "+req.body.destination+" telah berhasil diambil!",
        type: "car",
        status: "unread",
      });

      res.status(200).json({
        status: 200,
        message: "Mobil telah diambil!",
        data: car_transaction_data,
      });
    }else if(req.body.status == "Selesai"){
      //Create new notification
      const notification = await Notification.query().insert({
        user_id: data_user.id,
        notification: "Peminjaman Mobil ke "+req.body.destination+" telah selesai!",
        type: "car",
        status: "unread",
      });

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
