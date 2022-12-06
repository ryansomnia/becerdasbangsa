const koneksi = require("../config/database");

let user = {
  login: async (req, res) => {
    try {
        let {username, password} = req.body
      let qry = `SELECT nama FROM user 
      WHERE username='${username}' 
      AND password='${password}' 
      AND status= '1' 
      AND role = 'admin' OR role = 'manager'`
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
       if (results.length > 0) {
        let result = {
            code : 200,
            status : "success",
            data : results[0].nama

        }
        res.status(result.code).send(result);
        console.log(result);
        return result
       }else{
        let result = {
            code : 401,
            status : "Unauthorized",
            data : results

        }
        res.status(result.code).send(result);
        console.log(result);
        return result
       }
      });
    } catch (e) {
        let result = {
            code : 500,
            status : "Error",
            error : e

        }
        res.status(result.code).send(result);
        console.log(result);
        return result
    }
  },
  addUser: async (req, res) =>{
    try {
        let {username, password, nama, role} = req.body
        let qry = `INSERT INTO user (username, password, nama, status, role) 
    VALUES ('${username}', '${password}', '${nama}', 1, '${role}')`

    koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        res.send(results);
        console.log(results);
      });

    } catch (e) {
        res.send(e);
        console.log(e);
    }
    
  },
  getData: async (req, res) =>{
    try {
      let qry = `SELECT * FROM user`;
      koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
        let result = {
          code : 200,
          status : "success",
          data : results
  
      }
      res.status(result.code).send(result);
      console.log(result);
      });

    } catch (err) {
      let error = {
        code : 500,
        status : "error",
        data : err

    }
    res.status(error.code).send(error);
    console.log(error);
    }
   
  },
  deleteData: async(req, res)=>{
    try {
      let id = req.body.id
      console.log('id',id);
      let qry = `DELETE FROM user WHERE iduser = '${id}'`

  koneksi.query(qry, (err, results, fields) => {
      if (err) throw err;
      console.log('delete');
      res.send(results);
      console.log(results);
    });

  } catch (e) {
      res.send(e);
      console.log(e);
  }
  }
};

module.exports = user;
