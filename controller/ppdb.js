const conn = require('../config/database')

let ppdb = {
    getAllData : async(req, res)=>{
        try {
            conn.query(`SELECT * FROM siswa WHERE status = 'inRegister'`, (err,data, fields)=>{
                if (err) {
                    let respon = {
                        code : 400,
                        status : 'error',
                        error : err       
                    }
                   res.status(400).send(respon) 
                   console.log(respon);
                } else {
                    let respon = {
                        code : 200,
                        status : 'success',
                        data : data       
                    }
                   res.status(200).send(respon) 
                   console.log(respon);
                }
            })
        } catch (error) {
            let respon = {
                code : 500,
                status : 'error',
                error : error       
            }
           res.status(500).send(respon) 
           console.log(respon);
        }
    },
    registerData : async(req, res)=>{
        try {
            let namaSiswa = req.body.namaSiswa
            let jenisKelamin = req.body.jenisKelamin
            let tanggalLahir = req.body.tanggalLahir
            let agama = req.body.agama
            let gereja = req.body.gereja
            let kewarganegaraan = req.body.kewarganegaraan
            let jumlahSaudara = req.body.jumlahSaudara
            let anakKe = req.body.anakKe
            let golonganDarah = req.body.golonganDarah
            let alamat = req.body.alamat
            let noHandphone = req.body.noHandphone
            let bertempatTinggal = req.body.bertempatTinggal
            let jarakKeSekolah = req.body.jarakKeSekolah
            let NIK = req.body.NIK
            let asalSekolah = req.body.asalSekolah
            let tanggalDanNoSTTBTK = req.body.tanggalDanNoSTTBTK
            let a_namaAyah = req.body.a_namaAyah
            let a_pendidikanTerakhir = req.body.a_pendidikanTerakhir
            let a_pekerjaan = req.body.a_pekerjaan
            let a_alamatKantor = req.body.a_alamatKantor
            let a_agama = req.body.a_agama
            let a_gereja = req.body.a_gereja
            let a_tempatLahir = req.body.a_tempatLahir
            let a_tglLahir = req.body.a_tglLahir
            let a_alamatRumah = req.body.a_alamatRumah
            let a_noHandphone = req.body.a_noHandphone
            let i_namaIbu = req.body.i_namaIbu
            let i_pendidikanTerakhir = req.body.i_pendidikanTerakhir
            let i_pekerjaan = req.body.i_pekerjaan
            let i_alamatKantor = req.body.i_alamatKantor
            let i_agama = req.body.i_agama
            let i_gereja = req.body.i_gereja
            let i_tempatLahir = req.body.i_tempatLahir
            let i_tglLahir = req.body.i_tglLahir
            let i_alamatRumah = req.body.i_alamatRumah

            

            let qry = `INSERT INTO register (namaLengkap, jenisKelamin, tanggalLahir, tempatLahir,
                 agama, gereja, kewarganegaraan, jumlahSaudara, anakKe, golonganDarah, alamat,
                  noHandphone, bertempatTinggal, jarakKeSekolah, NIK, asalSekolah, tanggalDanNoSTTBTK,
                   a_namaAyah, a_pendidikanTerakhir, a_pekerjaan, a_alamatKantor, a_agama, a_gereja,
                    a_tempatLahir, a_tglLahir, a_alamatRumah, a_noHandphone, i_namaIbu, i_pendidikanTerakhir,
                     i_pekerjaan, i_alamatKantor, i_agama, i_gereja, i_tempatLahir, i_tglLahir, i_alamatRumah, statusRegistrasi)
                     
            VALUES ('${namaSiswa}', '${jenisKelamin}', '${tanggalLahir}',
             '${agama}', '${gereja}', '${kewarganegaraan}', '${jumlahSaudara}', '${anakKe}', '${golonganDarah}', '${alamat}',
              '${noHandphone}', '${bertempatTinggal}', '${jarakKeSekolah}', '${NIK}', '${asalSekolah}', '${tanggalDanNoSTTBTK}',
               '${a_namaAyah}', '${a_pendidikanTerakhir}', '${a_pekerjaan}', '${a_alamatKantor}', '${a_agama}', '${a_gereja}',
                '${a_tempatLahir}', '${a_tglLahir}', '${a_alamatRumah}', '${a_noHandphone}', '${i_namaIbu}', '${i_pendidikanTerakhir}',
                 '${i_pekerjaan}', '${i_alamatKantor}', '${i_agama}', '${i_gereja}', '${i_tempatLahir}', '${i_tglLahir}', '${i_alamatRumah}', 'registrasi');
           `

            conn.query(qry, (err,data, fields)=>{
                if (err) {
                    let respon = {
                        code : 400,
                        status : 'error',
                        error : err       
                    }
                   res.status(400).send(respon) 
                   console.log(respon);
                } else {
                    let respon = {
                        code : 200,
                        status : 'success',
                        data : data       
                    }
                   res.status(200).send(respon) 
                   console.log(respon);
                }
            })
        } catch (error) {
            let respon = {
                code : 500,
                status : 'error',
                error : error       
            }
           res.status(500).send(respon) 
           console.log(respon);
        }
    },
    editData : async(req, res)=>{
        try {
            let id = req.body.id
            let status = req.body.status

            let qry = `UPDATE siswa 
            SET status = '${status}' 
            WHERE idsiswa = '${id}'`

            conn.query(qry, (err,data, fields)=>{
                if (err) {
                    let respon = {
                        code : 400,
                        status : 'error',
                        error : err       
                    }
                   res.status(400).send(respon) 
                   console.log(respon);
                } else {
                    let respon = {
                        code : 200,
                        status : 'success',
                        data : data       
                    }
                   res.status(200).send(respon) 
                   console.log(respon);
                }
            })
        } catch (error) {
            let respon = {
                code : 500,
                status : 'error',
                error : error       
            }
           res.status(500).send(respon) 
           console.log(respon);
        }
    },
    deleteData : async(req, res)=>{
        try {
            let id = req.body.id

            let qry =`DELETE FROM siswa 
            WHERE idsiswa = '${id}'`

            conn.query(qry, (err,data, fields)=>{
                if (err) {
                    let respon = {
                        code : 400,
                        status : 'error',
                        error : err       
                    }
                   res.status(400).send(respon) 
                   console.log(respon);
                } else {
                    let respon = {
                        code : 200,
                        status : 'success',
                        data : data       
                    }
                   res.status(200).send(respon) 
                   console.log(respon);
                }
            })
        } catch (error) {
            let respon = {
                code : 500,
                status : 'error',
                error : error       
            }
           res.status(500).send(respon) 
           console.log(respon);
        }
    },

}

module.exports = ppdb;