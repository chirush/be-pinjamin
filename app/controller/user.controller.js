const User = require("../model/user.model");

const bcrypt = require("bcryptjs/dist/bcrypt");

const index = async (req, res) => {
  try {
    const users = await User.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: users,
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
    let emailCheck = await User.query().where("email", req.body.email).first();
    if (emailCheck) {
      return res.status(400).json({
        status: 400,
        message: "Email not available!",
      });
    }

    let phoneCheck = await User.query().where("phone", req.body.phone).first();
    if (phoneCheck) {
      return res.status(400).json({
        status: 400,
        message: "Phone Number not available!",
      });
    }

    if (!/gmedia\.id$/.test(req.body.email)){
      return res.status(400).json({
        status: 400,
        message: "Email harus memiliki domain @gmedia.id!",
      });
    }

    const user = await User.query().insert({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),        
      phone: (req.body.phone).toString(),
      role: req.body.role,
      division: req.body.division,
    });

    if(req.file){
      await User.query()
        .findById(req.params.id)
        .patch({
          picture: req.file.filename,
        });
    }

    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: user,
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
    const user = await User.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: user,
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
    if(req.body.newpassword){
      const user = await User.query().findById(req.params.id);
      
      if (await bcrypt.compare(req.body.oldpassword, user.password)) {
        await User.query()
          .findById(req.params.id)
          .patch({
            password: await bcrypt.hash(req.body.newpassword, 10),
          });
        }
    }else{
      if (!/gmedia\.id$/.test(req.body.email)){
        return res.status(400).json({
          status: 400,
          message: "Email harus memiliki domain @gmedia.id!",
        });
      }

      const user = await User.query()
        .findById(req.params.id)
        .patch({
          name: req.body.name,
          email: req.body.email,
          phone: (req.body.phone).toString(),
          role: req.body.role,
          division: req.body.division,
        });

      if(req.file){
        await User.query()
          .findById(req.params.id)
          .patch({
            picture: req.file.filename,
          });
      }
    }

    const user_data = await User.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Success update!",
      data: user_data,
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
    const user = await User.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: user,
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
    const userid = req.user.id;
    const users = await User.query().where('id', userid);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: users,
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
