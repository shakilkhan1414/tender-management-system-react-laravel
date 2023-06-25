-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2023 at 06:01 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tender-management-system`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_05_26_205407_create_user_types_table', 1),
(6, '2023_05_26_214424_create_tenders_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tenders`
--

CREATE TABLE `tenders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tender_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tender_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tender_price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tender_description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tender_location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `submission_date` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `submitted_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tender_document` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reffered_to` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tenders`
--

INSERT INTO `tenders` (`id`, `tender_name`, `tender_type`, `tender_price`, `tender_description`, `tender_location`, `submission_date`, `submitted_by`, `tender_document`, `reffered_to`, `created_at`, `updated_at`) VALUES
(2, 'Renovation Project for ABC Corporation Headquarters', 'Construction', '75000', 'We are seeking proposals for the renovation of our corporate headquarters. The project includes remodeling of office spaces etc.', '456 Elm Street, City', '15-07-2023', '2', 'tenders/6mkXbOM09SkXk2W0w3mc3oArnguyfznbrtmqizBg.pdf', '3', '2022-09-15 22:27:23', '2023-06-12 17:09:28'),
(3, 'IT Infrastructure Upgrade for XYZ Corporation', 'IT', '28000', 'XYZ Corporation is looking to upgrade its IT infrastructure to enhance system performance and security.', '789 Oak Avenue, City', '20-08-2023', '6', 'tenders/98J9NQEGeugw0FMfNSzYXBx5gFY3lAs5QjZOFX9h.pdf', NULL, '2023-05-23 22:30:31', '2023-05-16 22:30:31'),
(4, 'Consulting Services for Market Research', 'Consulting', '45000', 'We require consulting services to conduct market research for our new product launch.', '321 Pine Street, City', '05-09-2023', '6', 'tenders/JBlZkzDobQ7vuU0sdph8i86dOh8K25cEaAb5VLZK.pdf', '5', '2023-05-17 22:31:33', '2023-05-30 11:56:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `user_type`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Shakil Khan', 'khan.shakil.1414@gmail.com', NULL, '$2y$10$6BdDKAoi326A.g3SFm5ecOZ54o7VFPzVSkbUaf2cCJtUkD9D565Cy', '3', NULL, '2022-09-26 18:00:00', '2023-05-30 12:18:20'),
(2, 'Tony Stark', 'batm9651@gmail.com', NULL, '$2a$12$/xJITvYHdfeFlTWLEwA1Pe9ML6ZPxAGedvF.4kPvWkzwUfvetNDEW', '1', NULL, '2022-09-26 18:00:00', '2023-06-12 14:49:17'),
(3, 'Robert Pots', 'robert@gmail.com', NULL, '$2a$12$xCGM8SwIKCvsjeMIvMakbeI/X41w/oqpizmE8DLVLPdAmzN1cqnD.', '2', NULL, '2022-09-19 18:00:00', '2022-09-26 18:00:00'),
(4, 'Rakib Khan', 'rakib@gmail.com', NULL, '$2a$12$PVk7thd0WRWqxb9jj9QbvOB2eunR81GNgPKqe65KStMVvYpFdF4s.', '2', NULL, '2022-09-22 18:00:00', '2022-09-22 18:00:00'),
(5, 'Shakib Hasan', 'shakib@gmail.com', NULL, '$2a$12$EoYmTsB8QUug8VpxvKj5heSg.DWrDeYsfSszDUqbBnBUpevKot64K', '2', NULL, '2022-09-14 18:00:00', '2022-09-26 18:00:00'),
(6, 'Asif Hasan', 'asif@gmail.com', NULL, '$2a$12$nDzmkLXNUE.619.Tv6DG6O/OLpgxibqbZS6EvT38gSv34obh8lUh2', '1', NULL, '2022-09-27 18:00:00', '2022-09-22 18:00:00'),
(8, 'Farhan Rahman', 'farhan@gmail.com', NULL, '$2y$10$6Ds6pu8Tge5vpqFWfedqDuYWqhvPFIUioYWFzQYOq2we1dVarsIcK', '1', NULL, '2023-05-28 15:59:16', '2023-05-28 15:59:16'),
(15, 'Rony', 'rony@gmail.com', NULL, '$2y$10$Y67NmaFWqN7v37QXrUUhg.ZrZ1nvT2jr8iLtwdUXeFHwa6XVHrg.6', '1', NULL, '2023-05-29 16:27:55', '2023-05-29 17:56:10');

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `user_type`, `created_at`, `updated_at`) VALUES
(1, 'member', '2022-09-26 18:00:00', '2022-09-26 18:00:00'),
(2, 'tender_reviewer', '2022-09-22 18:00:00', '2022-09-22 18:00:00'),
(3, 'operating_officer', '2022-09-22 18:00:00', '2022-09-26 18:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `tenders`
--
ALTER TABLE `tenders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tenders`
--
ALTER TABLE `tenders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
