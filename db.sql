sudo apt update

sudo apt install mysql-server

sudo systemctl start mysql.service

sudo mysql

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Cerd@sB@ngs@5000';

sudo systemctl status mysql.service


CREATE DATABASE IF NOT EXISTS cerdasbangsa;
USE cerdasbangsa;

CREATE TABLE user (
  iduser INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nama VARCHAR(150) NOT NULL,
  status TINYINT(1) DEFAULT 1,
  role ENUM('admin', 'manager', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE register (
  idregister INT AUTO_INCREMENT PRIMARY KEY,
  namaLengkap VARCHAR(150) NOT NULL,
  jenisRegis VARCHAR(50) NOT NULL,
  jenisKelamin ENUM('L', 'P') NOT NULL,
  tanggalLahir DATE NOT NULL,
  tempatLahir VARCHAR(100),
  agama VARCHAR(50),
  alamat TEXT,
  noHandphone VARCHAR(20),
  asalSekolah VARCHAR(150),
  statusRegistrasi VARCHAR(50) DEFAULT 'registrasi',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE galery (
  idgalery INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(150),
  kategori ENUM('sd', 'tk') NOT NULL,
  description TEXT,
  date DATE,
  url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE artikel (
  idartikel INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(200) NOT NULL,
  isi TEXT NOT NULL,
  tglCreate DATE,
  img VARCHAR(255),
  url VARCHAR(255),
  status TINYINT(1) DEFAULT 1,
  kategori ENUM('carousel', 'news', 'artikel') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);