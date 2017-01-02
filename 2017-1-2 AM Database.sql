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
  `prev_id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `period` int(11) NOT NULL,
  `youtube_playlist` varchar(150) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `course_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `last_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_of_chapter` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `is_completed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Course_5_FK_idx` (`course_id`),
  KEY `User_3_FK_idx` (`user_id`),
  KEY `Chapter_2_FK_idx` (`prev_id`),
  CONSTRAINT `Chapter_2_FK` FOREIGN KEY (`prev_id`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Course_5_FK` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `User_3_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `chapter_objective`
--

DROP TABLE IF EXISTS `chapter_objective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapter_objective` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prev_id` int(11) NOT NULL,
  `objective` varchar(70) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Chapter_1_FK_idx` (`chapter_id`),
  KEY `Chapter_Objective_FK_idx` (`prev_id`),
  CONSTRAINT `Chapter_1_FK` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Chapter_Objective_FK` FOREIGN KEY (`prev_id`) REFERENCES `chapter_objective` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `level_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `description` mediumtext,
  `date_of_course` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `is_completed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Course_Level_FK_idx` (`level_id`),
  KEY `Course_Type_FK_idx` (`type_id`),
  KEY `User_FK_idx` (`user_id`),
  CONSTRAINT `Course_Level_FK` FOREIGN KEY (`level_id`) REFERENCES `lookup_course_level` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Course_Type_FK` FOREIGN KEY (`type_id`) REFERENCES `lookup_course_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `User_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `course_objective`
--

DROP TABLE IF EXISTS `course_objective`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_objective` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prev_id` int(11) NOT NULL,
  `objective` varchar(70) NOT NULL,
  `course_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Course_2_FK_idx` (`course_id`),
  KEY `Course_Objective_FK_idx` (`prev_id`),
  CONSTRAINT `Course_2_FK` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Course_Objective_FK` FOREIGN KEY (`prev_id`) REFERENCES `course_objective` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `name` varchar(70) NOT NULL,
  `type_id` int(11) NOT NULL,
  `url` varchar(120) NOT NULL,
  `course_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Course_4_FK_idx` (`course_id`),
  KEY `Materail_Type_FK_idx` (`type_id`),
  CONSTRAINT `Course_4_FK` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Materail_Type_FK` FOREIGN KEY (`type_id`) REFERENCES `lookup_material_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `course_recommendation`
--

DROP TABLE IF EXISTS `course_recommendation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_recommendation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recommender_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `recommendee_id` int(11) NOT NULL,
  `date_of_recommendation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `Recommender_FK_idx` (`recommender_id`),
  KEY `Recommendee_FK_idx` (`recommendee_id`),
  KEY `Course_1_FK_idx` (`course_id`),
  CONSTRAINT `Course_1_FK` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Recommendee_FK` FOREIGN KEY (`recommendee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Recommender_FK` FOREIGN KEY (`recommender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_recommendation`
--

LOCK TABLES `course_recommendation` WRITE;
/*!40000 ALTER TABLE `course_recommendation` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_recommendation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_reference`
--

DROP TABLE IF EXISTS `course_reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_reference` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `type_id` int(11) NOT NULL,
  `url` varchar(120) NOT NULL COMMENT 'Link for a Course or a Book or a Lesson',
  `course_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_3_FK_idx` (`course_id`),
  KEY `Reference_Type_FK_idx` (`type_id`),
  CONSTRAINT `Course_3_FK` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reference_Type_FK` FOREIGN KEY (`type_id`) REFERENCES `lookup_material_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_reference`
--

LOCK TABLES `course_reference` WRITE;
/*!40000 ALTER TABLE `course_reference` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookup_course_level`
--

DROP TABLE IF EXISTS `lookup_course_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lookup_course_level` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_course_level`
--

LOCK TABLES `lookup_course_level` WRITE;
/*!40000 ALTER TABLE `lookup_course_level` DISABLE KEYS */;
INSERT INTO `lookup_course_level` VALUES (1,'Beginner'),(2,'Intermediate'),(3,'Advanced');
/*!40000 ALTER TABLE `lookup_course_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookup_course_type`
--

DROP TABLE IF EXISTS `lookup_course_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lookup_course_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_course_type`
--

LOCK TABLES `lookup_course_type` WRITE;
/*!40000 ALTER TABLE `lookup_course_type` DISABLE KEYS */;
INSERT INTO `lookup_course_type` VALUES (1,'Academic'),(2,'Practical');
/*!40000 ALTER TABLE `lookup_course_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookup_material_type`
--

DROP TABLE IF EXISTS `lookup_material_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lookup_material_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_material_type`
--

LOCK TABLES `lookup_material_type` WRITE;
/*!40000 ALTER TABLE `lookup_material_type` DISABLE KEYS */;
INSERT INTO `lookup_material_type` VALUES (1,'Book'),(2,'Course');
/*!40000 ALTER TABLE `lookup_material_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookup_user_role`
--

DROP TABLE IF EXISTS `lookup_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lookup_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_user_role`
--

LOCK TABLES `lookup_user_role` WRITE;
/*!40000 ALTER TABLE `lookup_user_role` DISABLE KEYS */;
INSERT INTO `lookup_user_role` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `lookup_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutorial`
--

DROP TABLE IF EXISTS `tutorial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tutorial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prev_id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `youtube_url` varchar(120) NOT NULL,
  `duration` int(11) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `chapter_id` int(11) NOT NULL,
  `date_of_tutorial` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `youtube_link_UNIQUE` (`youtube_url`),
  KEY `Chapter_5_FK_idx` (`chapter_id`),
  KEY `User_5_FK_idx` (`user_id`),
  KEY `Tutorial_3_FK_idx` (`prev_id`),
  CONSTRAINT `Chapter_5_FK` FOREIGN KEY (`chapter_id`) REFERENCES `chapter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Tutorial_3_FK` FOREIGN KEY (`prev_id`) REFERENCES `tutorial` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `User_5_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `name` varchar(70) NOT NULL,
  `type_id` int(11) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `tutorial_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Tutorial_1_FK_idx` (`tutorial_id`),
  KEY `Material_Type_1_FK_idx` (`type_id`),
  CONSTRAINT `Material_Type_1_FK` FOREIGN KEY (`type_id`) REFERENCES `tutorial_attachments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  `user_role_id` int(11) NOT NULL,
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
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `number_of_logins` int(11) NOT NULL DEFAULT '0',
  `last_login_date` datetime DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_role_FK_idx` (`user_role_id`),
  CONSTRAINT `User_Role_FK` FOREIGN KEY (`user_role_id`) REFERENCES `lookup_user_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ahmed_Mater','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','ahmedmotair@gmail.com',1,'2016-10-08 17:05:54','Ahmed','Mater','M',1,'Zagazig University','Engineering','Software Developer','Egypt',NULL,'Ahmed_Mater18112016641.gif',NULL,'2016-12-10 16:31:21',0,0,NULL,0),(2,'Admin','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','ahmed.motair@gizasystems.com',1,'2016-11-27 04:38:07','Admin','Test','M',1,NULL,NULL,NULL,NULL,'1993-05-15',NULL,NULL,'2016-12-10 16:31:21',1,0,NULL,0),(3,'User_Test','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','nightwolf2015@yahoo.com',2,'2016-12-02 07:19:07','Ali','Samy','M',1,'Zag','Engineering','Engineer','Egypt','1993-02-02',NULL,NULL,'2016-12-10 16:31:21',1,0,NULL,0),(4,'Admin1_Test','ahmednight','ahmedmotair@gmail.com',1,'2016-12-16 10:25:48','Ajlsdjaskdasd','asndansdkasnd','M',0,NULL,NULL,NULL,NULL,'2000-10-05',NULL,NULL,'2016-12-17 06:52:59',1,0,NULL,0),(19,'Admin1_Test','ahmednight','ahmedmotair@gmail.com',2,'2016-12-17 09:47:40','Ahmed','Mater','M',0,NULL,NULL,NULL,NULL,'1993-05-15',NULL,NULL,'2016-12-17 09:47:40',1,0,NULL,0),(21,'Admin1_Test','ahmednight','ahmedmotair@gmail.com',2,'2016-12-17 09:52:42','Ahmed','Mater','M',0,NULL,NULL,NULL,NULL,'1993-05-15',NULL,NULL,'2016-12-17 09:52:42',1,0,NULL,0),(22,'Admin1_Test','ahmednighta','ahmedmotair@gmail.com',2,'2016-12-20 04:58:19','Ahmed','Mater','M',0,NULL,NULL,NULL,NULL,'1993-05-15',NULL,NULL,'2016-12-20 04:58:19',1,0,NULL,0),(23,'Admin1_Test','ahmednight','ahmedmotair@gmail.com',2,'2016-12-20 04:59:15','Ahmed','Mater','M',0,NULL,NULL,NULL,NULL,'1993-05-15',NULL,NULL,'2016-12-20 04:59:15',1,0,NULL,0),(24,'Admin1_Test','ahmednight','ahmedmotair@gmail.com',2,'2016-12-20 04:59:28','Ahmed','Mater','M',0,NULL,NULL,NULL,NULL,'1993-05-15',NULL,NULL,'2016-12-20 04:59:28',1,0,NULL,0),(25,'Admin1_Test','ahmednight','ahmedmotair@gmail.com',1,'2016-12-20 05:01:26','Ajlsdjaskdasd','asndansdkasnd','M',0,NULL,NULL,NULL,NULL,'2000-10-05',NULL,NULL,'2016-12-20 05:12:55',1,0,NULL,0);
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

-- Dump completed on 2017-01-02  4:16:15
