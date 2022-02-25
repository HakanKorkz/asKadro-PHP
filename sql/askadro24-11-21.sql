-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 24 Kas 2021, 11:47:18
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
  `companyName` varchar(4000) DEFAULT NULL,
  `companyEmail` varchar(1000) DEFAULT NULL,
  `companyPhone` varchar(200) DEFAULT NULL,
  `companyFax` varchar(200) DEFAULT NULL,
  `companyGivePrice` decimal(19,2) DEFAULT NULL,
  `companyLocation` varchar(2000) DEFAULT NULL,
  `companyOvertime` decimal(19,2) DEFAULT NULL,
  `companyService` enum('true','false') DEFAULT 'false',
  `companyDateOfRegistration` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `companies`
--

INSERT INTO `companies` (`ID`, `companyCode`, `companyName`, `companyEmail`, `companyPhone`, `companyFax`, `companyGivePrice`, `companyLocation`, `companyOvertime`, `companyService`, `companyDateOfRegistration`) VALUES
(1, 1637754374, 'Korkmaz Yazılım', 'info@korkmazyazilim.com', '05384034367', '053840343671', '3500.00', 'Sakarya/Adapazarı', '150.00', 'true', '2021-11-24 14:46:14');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `employees`
--

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `employeeCode` int DEFAULT NULL,
  `lastname` varchar(2000) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `age` int NOT NULL,
  `address` text NOT NULL,
  `tc` text NOT NULL,
  `iban` text NOT NULL,
  `dateOfRegistration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `firstname` varchar(2000) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `employees`
--

INSERT INTO `employees` (`ID`, `employeeCode`, `lastname`, `phone`, `age`, `address`, `tc`, `iban`, `dateOfRegistration`, `firstname`) VALUES
(1, 1637750361, 'Korkmaz', '5384034367', 24, 'tt', '55555555', 'TR111111111', '2021-11-23 21:51:30', 'Hakan'),
(13, 1637750661, 'Çakmak', '05384034468', 32, 'İzmir', '22222222', 'TR8600000000', '2021-11-24 13:44:21', 'Ahmet');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
