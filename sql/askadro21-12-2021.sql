-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 21 Ara 2021, 16:31:14
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
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `companies`
--

INSERT INTO `companies` (`ID`, `companyStatus`, `companyCode`, `companyName`, `companyEmail`, `companyPassword`, `companyPhone`, `companyHumanResourcesPhone`, `companyHumanResourcesName`, `companyLocation`, `companyGivePrice`, `companyTaxNumber`, `companyInvoice`, `companyService`, `companyCreateDate`) VALUES
(3, 'active', 1639309945, 'Korkmaz yazılım', 'info@korkmazyazilim.com', 'e10adc3949ba59abbe56e057f20f883e', '0531235095', '0531235095', NULL, 'Sakarya', '1500.00', '5111196395', 'bilinmiyor', 'true', '2021-12-12 14:52:25'),
(4, 'active', 1639317016, 'Korkmaz yazılım', 'info@korkmazyazilim.com', 'e10adc3949ba59abbe56e057f20f883e', '0531235095', 'Erdo', '0531235096', 'Sakarya', '1500.00', '5111196395', 'bilinmiyor', 'true', '2021-12-12 16:50:16');

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
  `employeeStatus` enum('active','passive') DEFAULT 'active',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `employees`
--

INSERT INTO `employees` (`ID`, `employeeCode`, `firstname`, `lastname`, `email`, `employeePassword`, `phone`, `dateOfBirth`, `workType`, `address`, `tc`, `iban`, `employeeStatus`) VALUES
(19, 1640102996, 'emrah', 'soydan', 'hakan.54.gs@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '05384034368', '1997-12-03', 'Garson', 'izmir', '5591978226', 'TR100006216481947812676891', 'active');

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
) ENGINE=MyISAM AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `files`
--

INSERT INTO `files` (`ID`, `fileCode`, `commonCode`, `filePath`, `fileName`, `fileFunction`, `fileStatus`) VALUES
(42, 1640103006, 1640102996, 'uploads/employees/img/1640102996.jpg', '1640102996', 'criminalRecord', 'active'),
(43, 1640103007, 1640102996, 'uploads/employees/img/1640102996_1.jpg', '1640102996', 'socialSecurity', 'active');

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
  `authority` enum('admin','official','specialAuthority') DEFAULT NULL,
  `managerCreationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `managerDateOfUpdate` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `managers`
--

INSERT INTO `managers` (`ID`, `managerCode`, `managerEmail`, `managerPassword`, `authority`, `managerCreationDate`, `managerDateOfUpdate`) VALUES
(3, 123456, 'sotohi8204@videour.com', 'e10adc3949ba59abbe56e057f20f883e', 'admin', '2021-12-20 17:26:57', '000-00-00 00:00:00');

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
  `workCode` int DEFAULT NULL,
  `companyCode` int DEFAULT NULL,
  `employeeCode` int DEFAULT NULL,
  `salary` double(19,2) DEFAULT NULL,
  `dateOfStart` datetime DEFAULT NULL,
  `jobEndDate` datetime DEFAULT NULL,
  `createDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `works`
--

INSERT INTO `works` (`ID`, `workCode`, `companyCode`, `employeeCode`, `salary`, `dateOfStart`, `jobEndDate`, `createDate`, `updateDate`) VALUES
(1, 1639849103, 1639309945, 1639141922, 150.00, '2021-12-12 18:01:00', '2021-12-12 23:00:00', '2021-12-18 20:38:23', '0000-00-00 00:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
