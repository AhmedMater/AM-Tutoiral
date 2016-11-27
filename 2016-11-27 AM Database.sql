CREATE DATABASE  IF NOT EXISTS `am` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `am`;
-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: am
-- ------------------------------------------------------
-- Server version	5.6.26-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `last_update` datetime NOT NULL,
  `date_of_chapter` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Course_5_FK_idx` (`course_id`),
  CONSTRAINT `Course_5_FK` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter_content`
--

DROP TABLE IF EXISTS `chapter_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapter_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chapter_id` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `content` varchar(70) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Chapter_2_FK_idx` (`chapter_id`),
  CONSTRAINT `Chapter_2_FK` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter_content`
--

LOCK TABLES `chapter_content` WRITE;
/*!40000 ALTER TABLE `chapter_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapter_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter_objective`
--

DROP TABLE IF EXISTS `chapter_objective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapter_objective` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chapter_id` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `objective` varchar(70) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Chapter_1_FK_idx` (`chapter_id`),
  CONSTRAINT `Chapter_1_FK` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter_objective`
--

LOCK TABLES `chapter_objective` WRITE;
/*!40000 ALTER TABLE `chapter_objective` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapter_objective` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `period` int(11) NOT NULL,
  `course_level` enum('B','M','A') NOT NULL,
  `course_type` enum('A','P') NOT NULL,
  `playlist_link` varchar(120) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `date_of_course` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_content`
--

DROP TABLE IF EXISTS `course_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `content` varchar(70) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Course_1_FK_idx` (`course_id`),
  CONSTRAINT `Course_1_FK` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_content`
--

LOCK TABLES `course_content` WRITE;
/*!40000 ALTER TABLE `course_content` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_objective`
--

DROP TABLE IF EXISTS `course_objective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_objective` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `objective` varchar(70) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Course_2_FK_idx` (`course_id`),
  CONSTRAINT `Course_2_FK` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_objective`
--

LOCK TABLES `course_objective` WRITE;
/*!40000 ALTER TABLE `course_objective` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_objective` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_pre_requisite`
--

DROP TABLE IF EXISTS `course_pre_requisite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_pre_requisite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `url` varchar(120) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Course_4_FK_idx` (`course_id`),
  CONSTRAINT `Course_4_FK` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_pre_requisite`
--

LOCK TABLES `course_pre_requisite` WRITE;
/*!40000 ALTER TABLE `course_pre_requisite` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_pre_requisite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_reference`
--

DROP TABLE IF EXISTS `course_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_reference` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `type` enum('B','C') NOT NULL,
  `url` varchar(120) NOT NULL COMMENT 'Link for a Course or a Book or a Lesson',
  PRIMARY KEY (`id`),
  KEY `course_3_FK_idx` (`course_id`),
  CONSTRAINT `Course_3_FK` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_reference`
--

LOCK TABLES `course_reference` WRITE;
/*!40000 ALTER TABLE `course_reference` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookup`
--

DROP TABLE IF EXISTS `lookup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lookup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `value` varchar(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lookup_type_FK_idx` (`type_id`),
  CONSTRAINT `lookup_type_FK` FOREIGN KEY (`type_id`) REFERENCES `lookup_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup`
--

LOCK TABLES `lookup` WRITE;
/*!40000 ALTER TABLE `lookup` DISABLE KEYS */;
INSERT INTO `lookup` VALUES (1,1,'Admin','A'),(2,1,'User','U'),(3,2,'Easy','E'),(4,2,'Intermediate','I'),(5,2,'Advanced','A'),(6,3,'Academic','A'),(7,3,'Practical','P'),(8,4,'Course','C'),(9,4,'Book','B');
/*!40000 ALTER TABLE `lookup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookup_type`
--

DROP TABLE IF EXISTS `lookup_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lookup_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_type`
--

LOCK TABLES `lookup_type` WRITE;
/*!40000 ALTER TABLE `lookup_type` DISABLE KEYS */;
INSERT INTO `lookup_type` VALUES (1,'User Role'),(2,'Course Level'),(3,'Course Type'),(4,'Reference Type');
/*!40000 ALTER TABLE `lookup_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorial`
--

DROP TABLE IF EXISTS `tutorial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutorial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chapter_id` int(11) NOT NULL,
  `num` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `sub_name` varchar(70) DEFAULT NULL,
  `youtube_URL` varchar(120) NOT NULL,
  `youtube_duration` int(11) NOT NULL,
  `date_of_tutorial` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorial`
--

LOCK TABLES `tutorial` WRITE;
/*!40000 ALTER TABLE `tutorial` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutorial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorial_attachments`
--

DROP TABLE IF EXISTS `tutorial_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutorial_attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tutorial_id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Tutorial_1_FK_idx` (`tutorial_id`),
  CONSTRAINT `Tutorial_1_FK` FOREIGN KEY (`tutorial_id`) REFERENCES `tutorial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutorial_attachments`
--

LOCK TABLES `tutorial_attachments` WRITE;
/*!40000 ALTER TABLE `tutorial_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `tutorial_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(70) NOT NULL,
  `user_role` enum('A','U') NOT NULL,
  `date_of_registration` datetime DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `mail_subscribe` tinyint(1) NOT NULL,
  `university` varchar(45) DEFAULT NULL,
  `college` varchar(45) DEFAULT NULL,
  `job` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `profile_pic` varchar(100) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_FK_idx` (`user_role`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ahmed_Mater','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','ahmedmotair@gmail.com','A','2016-10-08 17:05:54','Ahmed','Mater','M',1,'Zagazig University','Engineering','Software Developer','Egypt',NULL,'Ahmed_Mater18112016641.gif',NULL),(2,'Admin','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','ahmed.motair@gizasystems.com','A','2016-11-27 04:38:07','Admin','Test','M',1,NULL,NULL,NULL,NULL,'1993-05-15',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-27  5:43:18
