const koneksi = require("../config/database");

let user = {
  login: async (req, res) => {
    try {
      let { username, password } = req.body;
      let qry = `SELECT nama FROM user 
      WHERE username='${username}' 
      AND password='${password}' 
      AND status= '1' 
      AND role = 'admin' OR role = 'manager'`;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        if (results.length > 0) {
          let result = {
            code: 200,
            status: "success",
            data: results[0].nama,
          };
          res.status(result.code).send(result);
          return result;
        } else {
          let result = {
            code: 401,
            status: "Unauthorized",
            data: results,
          };
          res.status(result.code).send(result);
          return result;
        }
      });
    } catch (e) {
      let result = {
        code: 500,
        status: "Error",
        error: e,
      };
      res.status(result.code).send(result);
      return result;
    }
  },
  addUser: async (req, res) => {
    try {
      let { username, password, nama, role } = req.body;
      let qry = `INSERT INTO user (username, password, nama, status, role) 
    VALUES ('${username}', '${password}', '${nama}', 1, '${role}')`;

      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    } catch (e) {
      res.send(e);
    }
  },
  getData: async (req, res) => {
    try {
      let qry = `SELECT * FROM user`;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        let result = {
          code: 200,
          status: "success",
          data: results,
        };
        res.status(result.code).send(result);
      });
    } catch (err) {
      let error = {
        code: 500,
        status: "error",
        data: err,
      };
      res.status(error.code).send(error);
    }
  },
  getOneData: async (req, res) => {
    let iduser = req.body.iduser
    console.log('iii',req.body);
    try {
      let qry = `SELECT * FROM user WHERE iduser = '${iduser}'`;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        let result = {
          code: 200,
          status: "success",
          data: results,
        };
        console.log('get one');
        console.log(iduser);
        console.log(result);
        res.status(result.code).send(result);
      });
    } catch (err) {
      let error = {
        code: 500,
        status: "error",
        data: err,
      };
      res.status(error.code).send(error);
    }
  },
  deleteData: async (req, res) => {
    try {
      let id = req.body.id;
      let qry = `DELETE FROM user WHERE iduser = '${id}'`;

      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
      });
    } catch (e) {
      res.send(e);
    }
  },
  updateData: async (req, res) => {
    let { id, nama, password, username } = req.body;

    try {
      let qry = `UPDATE user 
                SET nama = '${nama}', password = '${password}', username = '${username}'
                WHERE iduser= '${id}'`;
      koneksi.query(qry, (err, results) => {
        if (err) throw err;
        console.log(results);
        let respon = {
          code : 200,
          status : 'success',
          message : 'data berhasil diubah'
        }
        res.send(respon);
      });
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = user;
