const bcrypt = require("bcryptjs/dist/bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../model/user.model");

const login = async (req, res) => {
  try {
    const user = await User.query()
      .select([
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.created_at",
        "users.updated_at",
      ])
      .where("email", req.body.email)
      .first();

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const user_data = await User.query()
        .select([
          "users.id",
          "users.name",
          "users.email",
          "users.password",
          "users.created_at",
          "users.updated_at",
        ])
        .where("id", user.id)
        .first();

      const token = jsonwebtoken.sign(user_data.toJSON(), process.env.APP_KEY, {
        expiresIn: "2h",
      });

      user_data.token = token;

      res.status(200).json({
        message: "Login berhasil!",
        data: user_data
      });

    } else {
      res.status(400).json({
        message: "Email atau password salah!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const register = async (req, res) => {
  try {
    let emailCheck = await User.query().where("email", req.body.email).first();
    if (emailCheck) {
      return res.status(400).json({
        status: 400,
        message: "Email tidak tersedia!",
      });
    }

    let phoneCheck = await User.query().where("phone", req.body.phone).first();
    if (phoneCheck) {
      return res.status(400).json({
        status: 400,
        message: "Nomor telepon tidak tersedia!",
      });
    }

    const user = await User.query().insert({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      phone: toStr(req.body.phone),
      role: "user",
    });

    res.status(200).json({
      status: 200,
      message: "OK",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  login,
  register,
};
