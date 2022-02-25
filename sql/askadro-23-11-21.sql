-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 23 Kas 2021, 18:51:44
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
-- Tablo için tablo yapısı `employees`
--

DROP TABLE IF EXISTS `employees`;
CREATE TABLE IF NOT EXISTS `employees` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(2000) NOT NULL,
  `lastname` varchar(2000) NOT NULL,
  `phone` varchar(200) NOT NULL,
  `age` int NOT NULL,
  `address` text NOT NULL,
  `tc` text NOT NULL,
  `iban` text NOT NULL,
  `dateOfRegistration` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `employees`
--

INSERT INTO `employees` (`ID`, `firstname`, `lastname`, `phone`, `age`, `address`, `tc`, `iban`, `dateOfRegistration`) VALUES
(1, 'Hakan', 'Korkmaz', '5384034367', 24, 'tt', '55555555', 'TR111111111', '2021-11-23 21:51:30');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
