-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 03 Oca 2022, 11:32:56
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
  `kdate` datetime NOT NULL,
  `tt` enum('t2','t1') NOT NULL DEFAULT 't1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `arge`
--

INSERT INTO `arge` (`id`, `text`, `kdate`, `tt`) VALUES
(1, 'test', '0000-00-00 00:00:00', 't1'),
(2, 'hhh', '0000-00-00 00:00:00', 't1'),
(3, '2021-12-10T19:17', '0000-00-00 00:00:00', 't1'),
(4, 'rezerve etim', '2021-12-13 19:24:00', 't1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `companyStatus` enum('active','passive') DEFAULT 'active',
  `companyCode` int DEFAULT NULL,
  `companyName` varchar(4000) DEFAULT NULL,
  `companyEmail` varchar(1000) DEFAULT NULL,
  `companyPassword` text,
  `companyPhone` varchar(200) DEFAULT NULL,
  `companyHumanResourcesPhone` varchar(200) DEFAULT NULL,
  `companyHumanResourcesName` varchar(200) DEFAULT NULL,
  `companyLocation` varchar(2000) DEFAULT NULL,
  `companyGivePrice` decimal(19,2) DEFAULT NULL,
  `companyTaxNumber` varchar(200) DEFAULT NULL,
  `companyInvoice` varchar(200) DEFAULT NULL,
  `companyService` enum('true','false') DEFAULT 'false',
  `companyCreateDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `companies`
--

INSERT INTO `companies` (`ID`, `companyStatus`, `companyCode`, `companyName`, `companyEmail`, `companyPassword`, `companyPhone`, `companyHumanResourcesPhone`, `companyHumanResourcesName`, `companyLocation`, `companyGivePrice`, `companyTaxNumber`, `companyInvoice`, `companyService`, `companyCreateDate`) VALUES
(10, 'active', 1641071341, 'Korkmaz Bilişim', 'hihik15480@veb65.com', 'e10adc3949ba59abbe56e057f20f883e', '05384034367', '05375034367', 'Erdem', 'Turkey', '1500.00', '7929733535', 'Aktif', 'true', '2022-01-02 00:09:01');

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
  `hesCode` varchar(200) DEFAULT NULL,
  `employeeStatus` enum('active','passive') DEFAULT 'active',
  `employeeCreateDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `employees`
--

INSERT INTO `employees` (`ID`, `employeeCode`, `firstname`, `lastname`, `email`, `employeePassword`, `phone`, `dateOfBirth`, `workType`, `address`, `tc`, `iban`, `hesCode`, `employeeStatus`, `employeeCreateDate`) VALUES
(6, 1641044281, 'hakan', 'korkmaz', 'hakan.hizmet.54.gs@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '05384034367', '1997-05-10', 'İşçi', 'Turkey', '64132361118', 'TR510006297294296444451446', '123456789', 'active', '2022-01-02 00:45:50'),
(7, 1641073134, 'Adem', 'Iğnak', 'yonorap556@veb65.com', '96e79218965eb72c92a549dd5a330112', '053485076697', '2000-02-10', NULL, NULL, NULL, NULL, NULL, 'active', '2022-01-02 00:45:50');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `files`
--

DROP TABLE IF EXISTS `files`;
CREATE TABLE IF NOT EXISTS `files` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `fileCode` int DEFAULT NULL,
  `commonCode` int DEFAULT NULL,
  `filePath` text,
  `fileName` text,
  `fileFunction` varchar(2000) DEFAULT NULL,
  `fileStatus` enum('active','passive') DEFAULT 'active',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `managers`
--

DROP TABLE IF EXISTS `managers`;
CREATE TABLE IF NOT EXISTS `managers` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `managerCode` int DEFAULT NULL,
  `managerEmail` varchar(2000) DEFAULT NULL,
  `managerPassword` text,
  `managerCreationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `managerDateOfUpdate` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `managers`
--

INSERT INTO `managers` (`ID`, `managerCode`, `managerEmail`, `managerPassword`, `managerCreationDate`, `managerDateOfUpdate`) VALUES
(12, 1641044474, 'hihik15480@veb65.com', 'e10adc3949ba59abbe56e057f20f883e', '2022-01-01 16:42:59', '00-00-000 00:00:00');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `works`
--

DROP TABLE IF EXISTS `works`;
CREATE TABLE IF NOT EXISTS `works` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `workCode` int DEFAULT NULL,
  `companyCode` int DEFAULT NULL,
  `employeeCode` int DEFAULT NULL,
  `price` double(19,2) DEFAULT NULL,
  `addPrice` double(19,2) DEFAULT NULL,
  `nextWork` int DEFAULT NULL,
  `workDate` date DEFAULT NULL,
  `workTime` time DEFAULT NULL,
  `createDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
