const koneksi = require("../config/database");

let register = {
  getData: async (req, res) => {
    try {
      let qry = `SELECT * FROM register`;
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
  registerData: async (req, res) => {
    try {
      let {
        namaLengkap,
        jenisKelamin,
        tanggalLahir,
        tempatLahir,
        agama,
        gereja,
        kewarganegaraan,
        jumlahSaudara,
        anakKe,
        golonganDarah,
        alamat,
        noHandphone,
        bertempatTinggal,
        jarakKeSekolah,
        NIK,
        asalSekolah,
        tanggalDanNoSTTBTK,
        a_namaAyah,
        a_pendidikanTerakhir,
        a_pekerjaan,
        a_alamatKantor,
        a_agama,
        a_gereja,
        a_tempatLahir,
        a_tglLahir,
        a_alamatRumah,
        a_noHandphone,
        i_namaIbu,
        i_pendidikanTerakhir,
        i_pekerjaan,
        i_alamatKantor,
        i_agama,
        i_gereja,
        i_tempatLahir,
        i_tglLahir,
        i_alamatRumah,
        i_noHandphone
        } = req.body;
console.log(req.body);
      let qry = `INSERT INTO register (namaLengkap, jenisKelamin, tanggalLahir, tempatLahir, agama, 
        gereja, kewarganegaraan, jumlahSaudara, anakKe, golonganDarah, alamat, noHandphone,
         bertempatTinggal, jarakKeSekolah, NIK, asalSekolah, tanggalDanNoSTTBTK, a_namaAyah,
          a_pendidikanTerakhir, a_pekerjaan, a_alamatKantor, a_agama, a_gereja, a_tempatLahir,
           a_tglLahir, a_alamatRumah, a_noHandphone, i_namaIbu, i_pendidikanTerakhir, i_pekerjaan,
            i_alamatKantor, i_agama, i_gereja, i_tempatLahir, i_tglLahir, i_alamatRumah, i_noHandphone, statusRegistrasi)

            VALUES ('${namaLengkap}', '${jenisKelamin}', '${tanggalLahir}', '${tempatLahir}', '${agama}',
             '${gereja}', '${kewarganegaraan}', '${jumlahSaudara}', '${anakKe}', '${golonganDarah}', '${alamat}', '${noHandphone}',
              '${bertempatTinggal}', '${jarakKeSekolah}', '${NIK}', '${asalSekolah}', '${tanggalDanNoSTTBTK}', '${a_namaAyah}',
               '${a_pendidikanTerakhir}', '${a_pekerjaan}', '${a_alamatKantor}', '${a_agama}', '${a_gereja}', '${a_tempatLahir}',
                '${a_tglLahir}', '${a_alamatRumah}', '${a_noHandphone}','${i_namaIbu}', '${i_pendidikanTerakhir}', '${i_pekerjaan}',
                 '${i_alamatKantor}', '${i_agama}', '${i_gereja}', '${i_tempatLahir}', '${i_tglLahir}', '${i_alamatRumah}','${i_noHandphone}', 1)`;

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
};

module.exports = register;
