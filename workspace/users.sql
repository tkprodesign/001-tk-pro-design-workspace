-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 07, 2026 at 06:53 PM
-- Server version: 11.4.10-MariaDB-cll-lve
-- PHP Version: 8.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rjhzxfeknu_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(190) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_registered` int(11) NOT NULL,
  `human_time` varchar(100) NOT NULL,
  `kyc_level` tinyint(3) UNSIGNED NOT NULL DEFAULT 1,
  `profile_picture` varchar(255) DEFAULT NULL,
  `last_active` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `date_registered`, `human_time`, `kyc_level`, `profile_picture`, `last_active`, `created_at`) VALUES
(1, 'Dev 24', 'tkprodesign96@gmail.com', '$2y$10$1MkyQ8UvWlgrLd8bv/ZBk.tLB7bLHHs2ZXgWXdNsqmO5ARXzstee2', 1780872543, '18:49 | 07/06/2026 | New York Time', 1, NULL, NULL, '2026-06-07 22:49:03'),
(2, 'Aaron Luciano breno', 'itekena.s.iyowuna@gmail.com', '$2y$10$NG3c69k6IjEP6K2pGK6xDeUIM0DcHO0.0YHBpX4Bym/oOEnARfBfO', 1780872616, '18:50 | 07/06/2026 | New York Time', 1, 'profile_6a25f5f5c33096.81958239.jpeg', NULL, '2026-06-07 22:50:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
