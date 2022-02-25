-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 10 Ara 2021, 15:17:26
-- Sunucu sürümü: 8.0.21
-- PHP Sürümü: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `askadro`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `arge`
--

DROP TABLE IF EXISTS `arge`;
CREATE TABLE IF NOT EXISTS `arge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `arge`
--

INSERT INTO `arge` (`id`, `text`) VALUES
(1, 'test'),
(2, 'hhh');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `companyCode` int DEFAULT NULL,
  `companyName` varchar(4000) DEFAULT NULL,
  `companyEmail` varchar(1000) DEFAULT NULL,
  `companyPassword` text,
  `companyPhone` varchar(200) DEFAULT NULL,
  `companyFax` varchar(200) DEFAULT NULL,
  `companyLocation` varchar(2000) DEFAULT NULL,
  `companyGivePrice` decimal(19,2) DEFAULT NULL,
  `companyTaxNumber` varchar(200) DEFAULT NULL,
  `companyInvoice` varchar(200) DEFAULT NULL,
  `companyBillStatement` varchar(200) DEFAULT NULL,
  `companyService` enum('true','false') DEFAULT 'false',
  `companyCreateDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `employees`
--

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `employeeCode` int DEFAULT NULL,
  `firstname` varchar(2000) NOT NULL,
  `lastname` varchar(2000) DEFAULT NULL,
  `email` varchar(2000) DEFAULT NULL,
  `employeePassword` text,
  `phone` varchar(200) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `workType` varchar(2000) DEFAULT NULL,
  `address` text,
  `tc` varchar(200) DEFAULT NULL,
  `iban` varchar(200) DEFAULT NULL,
  `criminalRecordFile` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `employees`
--

INSERT INTO `employees` (`ID`, `employeeCode`, `firstname`, `lastname`, `email`, `employeePassword`, `phone`, `dateOfBirth`, `workType`, `address`, `tc`, `iban`, `criminalRecordFile`) VALUES
(1, 1639141922, 'hakan', 'korkmazz', 'hakan.gasaray@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '05384034360', '2021-12-03', 'Garson', 'Şemdili', '55919782260', 'TR100006216481947812676891', 'uploads/employees/img/1639141922.png'),
(3, 1639144447, 'hakan', 'korkmazz', 'hakan.gasaray@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '05384034368', '2021-12-03', 'Garson', 'Şemdili', '55919782269', 'TR100006216481947812676891', 'uploads/employees/img/1639144447.png'),
(4, 1639144501, 'erkan', 'canik', 'hakan.gasaray@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '05384034365', '2021-12-03', 'Garson', 'Şemdili', '55919782267', 'TR100006216481947812676891', 'uploads/employees/img/1639144501.png');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `managers`
--

DROP TABLE IF EXISTS `managers`;
CREATE TABLE IF NOT EXISTS `managers` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `managerCode` int DEFAULT NULL,
  `authority` enum('admin','official','specialAuthority') DEFAULT NULL,
  `managerCreationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `managerDateOfUpdate` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `powersofmanagers`
--

DROP TABLE IF EXISTS `powersofmanagers`;
CREATE TABLE IF NOT EXISTS `powersofmanagers` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `managersCode` int DEFAULT NULL,
  `managerCode` int DEFAULT NULL,
  `managersAdd` enum('Yes','No') DEFAULT NULL,
  `managersUpdate` enum('Yes','No') DEFAULT NULL,
  `managersDelete` enum('Yes','No') DEFAULT NULL,
  `managersCreationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `managersDateOfUpdate` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `works`
--

DROP TABLE IF EXISTS `works`;
CREATE TABLE IF NOT EXISTS `works` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `companyCode` int DEFAULT NULL,
  `employeeCode` int DEFAULT NULL,
  `salary` double(19,2) DEFAULT NULL,
  `businessHistory` datetime DEFAULT NULL,
  `createDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
