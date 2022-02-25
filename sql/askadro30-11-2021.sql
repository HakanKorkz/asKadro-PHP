-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 30 Kas 2021, 14:46:24
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
-- Tablo için tablo yapısı `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `companyCode` int DEFAULT NULL,
  `companyFilePath` text,
  `companyName` varchar(4000) DEFAULT NULL,
  `companyEmail` varchar(1000) DEFAULT NULL,
  `companyPhone` varchar(200) DEFAULT NULL,
  `companyFax` varchar(200) DEFAULT NULL,
  `companyBill` text,
  `companyLocation` varchar(2000) DEFAULT NULL,
  `companyOvertime` decimal(19,2) DEFAULT NULL,
  `companyService` enum('true','false') DEFAULT 'false',
  `companyGivePrice` decimal(19,2) DEFAULT NULL,
  `companyDateOfRegistration` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `companies`
--

INSERT INTO `companies` (`ID`, `companyCode`, `companyFilePath`, `companyName`, `companyEmail`, `companyPhone`, `companyFax`, `companyBill`, `companyLocation`, `companyOvertime`, `companyService`, `companyGivePrice`, `companyDateOfRegistration`) VALUES
(1, 1637754374, NULL, 'Korkmaz Yazılım', 'info@korkmazyazilim.com', '05384034367', '053840343671', NULL, 'Sakarya/Adapazarı', '150.00', 'true', '3500.00', '2021-11-24 14:46:14'),
(2, 1638012917, NULL, 'Korkmaz', 'hakan.hizmet.54.gs@gmail.com', '905384034367', '02165343127896', NULL, 'Sakarya/Ada', '22.00', 'false', '2.50', '2021-11-27 14:35:17');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `employees`
--

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `employeeCode` int DEFAULT NULL,
  `firstname` varchar(2000) NOT NULL,
  `lastname` varchar(2000) NOT NULL,
  `email` varchar(2000) DEFAULT NULL,
  `employeePassword` text,
  `phone` varchar(200) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `workType` varchar(2000) DEFAULT NULL,
  `address` text NOT NULL,
  `tc` text NOT NULL,
  `iban` text NOT NULL,
  `createDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `employees`
--

INSERT INTO `employees` (`ID`, `employeeCode`, `firstname`, `lastname`, `email`, `employeePassword`, `phone`, `dateOfBirth`, `workType`, `address`, `tc`, `iban`, `createDate`, `updateDate`) VALUES
(1, 1638279421, 'hakan', 'korkmaz', 'herejo4610@sinagalore.com', '25f9e794323b453885f5181f1b624d0b', '08035513131', '1997-05-10', 'Evden', 'Türkiye', '49584659358', 'TR890006284796974426114136', '2021-11-30 16:37:01', '0000-00-00 00:00:00');

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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
