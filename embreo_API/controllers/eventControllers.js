const { db } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = `select * from proposed join event on proposed.id_event = event.id_event where id_user= ${db.escape(req.query.userId)};`;
    // console.log(scriptQuery)

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  getDetail: (req, res) => {
    let scriptQuery = `select * from event;`;

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  addData: (req, res) => { 
    let { id_event, id_user, proposed_date1, proposed_date2, proposed_date3, proposed_location, date_created } = req.body;
    let scriptQuery = `insert into db_sepaket.proposed value (null, ${db.escape(id_event)}, ${db.escape(id_user)},${db.escape(proposed_date1)},${db.escape(proposed_date2)},${db.escape(proposed_date3)},${db.escape(proposed_location)},${db.escape(date_created)},'Pending', null, null);`;
    console.log(scriptQuery)

    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send({ message: "Menambah Cart Berhasil", hasil: result });
    });
  },
  getOrder: (req, res) => {
    let scriptQuery = `select * from proposed join event on proposed.id_event = event.id_event where vendor_name= ${db.escape(req.query.vendor_name)};`;
    console.log(scriptQuery)
    db.query(scriptQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result);
    });
  },
  rejectOrder: (req, res) => {
    let { status, remark} = req.body;

    let updateQuery = `UPDATE db_sepaket.proposed set status = '${status}', remark = '${remark}' where id_proposed = ${req.params.id_proposed};`;
    console.log(updateQuery)

    db.query(updateQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result); 
    });
  },
  confirmOrder: (req, res) => {
    let { status, confirmed_date} = req.body;

    let updateQuery = `UPDATE db_sepaket.proposed set status = '${status}', confirmed_date = '${confirmed_date}' where id_proposed = ${req.params.id_proposed};`;
    console.log(updateQuery)

    db.query(updateQuery, (err, result) => {
      if (err) res.status(500).send(err);
      res.status(200).send(result); 
    });
  },
};
