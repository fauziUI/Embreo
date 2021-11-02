const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = "select * from db_sepaket.users;";
    if (req.query.username) {
      scriptQuery = `select * from db_sepaket.users where username = ${db.escape(
        req.query.username
      )};`;
    } else if (req.query.email) {
      scriptQuery = `select * from db_sepaket.users where email = ${db.escape(
        req.query.email
      )};`;
    }
    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  loginData: (req, res) => {
    let password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");

    let scriptQuery = `select * from db_sepaket.users where email = ${db.escape(req.body.email)} and password = '${password}';`;

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      if (result[0]) {
        let { id_user, username, email, password, role, status } = result[0];
        let token = createToken({
          id_user,
          username,
          email,
          password,
          role,
          status,
        });
        if (result[0].status !== "verified") {
          console.log("gagal belum verified");
          res.status(200).send({
            message: "Your account not yet verified, Please check your email",
          });
        } else {
          res
            .status(200)
            .send({ dataLogin: result[0], token, message: "Login Success" });
          console.log(result[0].id_user);
        }
      } else {
        let scriptQuery2 = `select * from db_sepaket.users where username = ${db.escape(req.body.email)} and password = '${password}';`;


        db.query(scriptQuery2, (err2, result2) => {
          if (err2) res.status(500).send(err2);
          if (result2[0]) {
            console.log("oke");
            let { id_user, username, email, password, role, status } =
              result2[0];
            let token = createToken({
              id_user,
              username,
              email,
              password,
              role,
              status,
            });
            if (result2[0].status !== "verified") {
              console.log("gagal belum verified");
              res.status(200).send({
                message:
                  "Your account not yet verified, Please check your email",
              });
            } else {
              res.status(200).send({
                dataLogin: result2[0],
                token,
                message: "Login Success",
              });
              console.log(result2[0].id_user);
            }
          } else {
            res.status(200).send({ message: "Failed to Login, Try Again" });
          }
        });
      }
    });
  }
};
