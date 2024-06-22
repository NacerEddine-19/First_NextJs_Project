-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 22, 2024 at 06:17 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop_db2`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `name`, `image`, `price`, `quantity`) VALUES
(1, 1, 'Product 1', 'Shoe1.jpg', 19.99, 1),
(2, 1, 'Product 2', 'Shoe2.jpg', 29.99, 1),
(3, 2, 'Product 3', 'Shoe3.jpg', 39.99, 1),
(4, 2, 'Product 4', 'Shoe4.jpg', 49.99, 1),
(5, 1, 'Shoe 2', 'Shoe2.jpg', 290.99, 1);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `message` text,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `user_id`, `message`) VALUES
(1, 1, 'This is a message from John Doe.'),
(2, 2, 'This is a message from Jane Smith.');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `payment_status` enum('pending','completed') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `payment_status`) VALUES
(1, 1, 590.98, 'completed'),
(2, 2, 290.99, 'pending'),
(3, 1, 190.99, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `categorie` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `description`, `categorie`) VALUES
(1, 'Shoe 1', 190.99, 'Shoe1.jpg', 'Black leather shoe with laces', 'Shoe'),
(2, 'Shoe 2', 290.99, 'Shoe2.jpg', 'Brown leather shoe with buckles', 'Shoe'),
(3, 'Shoe 3', 390.99, 'Shoe3.jpg', 'White sneaker with reflective details', 'Shoe'),
(4, 'Shoe 4', 490.99, 'Shoe4.jpg', 'Blue suede shoe with studs', 'Shoe'),
(5, 'Shoe 5', 590.99, 'Shoe5.jpg', 'Red suede shoe with stacked heels', 'Shoe'),
(6, 'Shoe 6', 690.99, 'Shoe6.jpg', 'Black leather boots with zip up detail', 'Shoe'),
(7, 'Shoe 7', 790.99, 'Shoe7.jpg', 'White leather ankle boots with laces', 'Shoe'),
(8, 'Shoe 8', 890.99, 'Shoe8.jpg', 'Gray suede slip on with a sleek design', 'Shoe'),
(9, 'Tshirt 1', 190.99, 'Tshirt1.png', 'White t-shirt with a simple design', 'Tshirt'),
(10, 'Tshirt 2', 290.99, 'Tshirt2.png', 'Black t-shirt with a leopard print', 'Tshirt'),
(11, 'Tshirt 3', 390.99, 'Tshirt3.png', 'Red t-shirt with a bold design', 'Tshirt'),
(12, 'Tshirt 4', 490.99, 'Tshirt4.png', 'Green t-shirt with a hibiscus print', 'Tshirt'),
(13, 'Tshirt 5', 590.99, 'Tshirt5.png', 'Beige t-shirt with a relaxed design', 'Tshirt'),
(14, 'Tshirt 6', 690.99, 'Tshirt6.png', 'Navy blue t-shirt with a striped pattern', 'Tshirt'),
(15, 'Tshirt 7', 790.99, 'Tshirt7.png', 'Gray t-shirt with a sports logo', 'Tshirt'),
(16, 'Tshirt 8', 890.99, 'Tshirt8.png', 'Purple t-shirt with a funky design', 'Tshirt'),
(17, 'Tshirt 9', 990.99, 'Tshirt9.png', 'Yellow t-shirt with a colorful design', 'Tshirt'),
(18, 'Tshirt 10', 109.99, 'Tshirt10.png', 'Orange t-shirt with a retro design', 'Tshirt'),
(19, 'Tshirt 11', 119.99, 'Tshirt11.png', 'Pink t-shirt with a floral print', 'Tshirt'),
(20, 'Tshirt 12', 129.99, 'Tshirt12.png', 'Grey t-shirt with a minimalist design', 'Tshirt'),
(21, 'Tshirt 13', 139.99, 'Tshirt13.png', 'Maroon t-shirt with a bold design', 'Tshirt'),
(22, 'Tshirt 14', 149.99, 'Tshirt14.png', 'Teal t-shirt with a leopard print', 'Tshirt'),
(23, 'Tshirt 15', 159.99, 'Tshirt15.png', 'Cyan t-shirt with a beachy design', 'Tshirt'),
(24, 'Bottle 1', 159.99, 'Bottle1.jpg', 'Clear plastic bottle with a cap', 'Bottle'),
(25, 'Bottle 2', 159.99, 'Bottle2.jpg', 'Glass bottle with a brown label', 'Bottle'),
(26, 'Bottle 3', 159.99, 'Bottle3.jpg', 'Aluminum bottle with a silver label', 'Bottle'),
(27, 'Bottle 4', 159.99, 'Bottle4.jpg', 'Plastic bottle with a white label', 'Bottle');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('user','admin') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `user_type`) VALUES
(1, 'Nacer', 'nacer@gmail.com', '202cb962ac59075b964b07152d234b70', 'user'),
(2, 'Oussama', 'oussama@gmail.com', '202cb962ac59075b964b07152d234b70', 'user'),
(3, 'Admin User', 'admin@admin.com', '202cb962ac59075b964b07152d234b70', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
