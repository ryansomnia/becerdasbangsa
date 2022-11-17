const koneksi = require("../config/database");

let user = {
  login: async (req, res) => {
    try {
        let {username, password} = req.body
      let qry = `SELECT nama FROM user 
      WHERE username='${username}' 
      AND password='${password}' 
      AND status= '1' 
      AND role = 'admin'`
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
        let {username, password, nama, status, role} = req.body
        let qry = `INSERT INTO user (username, password, nama, status, role) 
    VALUES ('${username}', '${password}', '${nama}', '${status}', '${role}')`

    koneksi.query(qry, (err, results, fields) => {
        if (err) throw err;
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
