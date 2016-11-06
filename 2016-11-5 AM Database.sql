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
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `date_of_course` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `period` int(11) NOT NULL,
  `reference_link` varchar(45) NOT NULL,
  `playlist_link` varchar(70) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL,
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
-- Table structure for table `course_chapters`
--

DROP TABLE IF EXISTS `course_chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_chapters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `course_FK_idx` (`course`),
  CONSTRAINT `course_2_FK` FOREIGN KEY (`course`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_chapters`
--

LOCK TABLES `course_chapters` WRITE;
/*!40000 ALTER TABLE `course_chapters` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `course_chapter` int(11) DEFAULT NULL,
  `name` varchar(60) NOT NULL,
  `video_link` varchar(70) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `course_FK_idx` (`course_chapter`),
  KEY `type_FK_idx` (`type`),
  CONSTRAINT `course_chapter_FK` FOREIGN KEY (`course_chapter`) REFERENCES `course_chapters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `type_FK` FOREIGN KEY (`type`) REFERENCES `lookup_item_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_data`
--

DROP TABLE IF EXISTS `item_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_type` int(11) NOT NULL,
  `data_type` int(11) NOT NULL,
  `data` longtext NOT NULL,
  `order_of_data` int(11) NOT NULL,
  `date_of_data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `data_type_FK_idx` (`data_type`),
  KEY `item_type_FK_idx` (`item_type`),
  CONSTRAINT `data_type_FK` FOREIGN KEY (`data_type`) REFERENCES `lookup_data_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_type_FK` FOREIGN KEY (`item_type`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_data`
--

LOCK TABLES `item_data` WRITE;
/*!40000 ALTER TABLE `item_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `keywords`
--

DROP TABLE IF EXISTS `keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keywords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` int(11) DEFAULT NULL,
  `course` int(11) DEFAULT NULL,
  `question` int(11) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `item_3_FK_idx` (`item`),
  KEY `course_4_FK_idx` (`course`),
  KEY `question_1_FK_idx` (`question`),
  CONSTRAINT `course_4_FK` FOREIGN KEY (`course`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_3_FK` FOREIGN KEY (`item`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `question_1_FK` FOREIGN KEY (`question`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keywords`
--

LOCK TABLES `keywords` WRITE;
/*!40000 ALTER TABLE `keywords` DISABLE KEYS */;
/*!40000 ALTER TABLE `keywords` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookup_data_type`
--

DROP TABLE IF EXISTS `lookup_data_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lookup_data_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `tag` varchar(45) DEFAULT NULL,
  `styles` varchar(45) DEFAULT NULL,
  `id_name` varchar(45) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_data_type`
--

LOCK TABLES `lookup_data_type` WRITE;
/*!40000 ALTER TABLE `lookup_data_type` DISABLE KEYS */;
INSERT INTO `lookup_data_type` VALUES (1,'Header',NULL,NULL,NULL,NULL),(2,'Sub Header',NULL,NULL,NULL,NULL),(3,'List Numeric',NULL,NULL,NULL,NULL),(4,'List Non Numeric',NULL,NULL,NULL,NULL),(5,'List Member',NULL,NULL,NULL,NULL),(6,'Paragraph',NULL,NULL,NULL,NULL),(7,'Image',NULL,NULL,NULL,NULL),(8,'Code',NULL,NULL,NULL,NULL),(9,'Link',NULL,NULL,NULL,NULL),(10,'File',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `lookup_data_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lookup_item_type`
--

DROP TABLE IF EXISTS `lookup_item_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lookup_item_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_item_type`
--

LOCK TABLES `lookup_item_type` WRITE;
/*!40000 ALTER TABLE `lookup_item_type` DISABLE KEYS */;
INSERT INTO `lookup_item_type` VALUES (1,'Article',NULL),(2,'Lesson',NULL);
/*!40000 ALTER TABLE `lookup_item_type` ENABLE KEYS */;
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
  `description` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lookup_user_role`
--

LOCK TABLES `lookup_user_role` WRITE;
/*!40000 ALTER TABLE `lookup_user_role` DISABLE KEYS */;
INSERT INTO `lookup_user_role` VALUES (1,'Admin','Can add items to the Website'),(2,'User','Can surf the Website only');
/*!40000 ALTER TABLE `lookup_user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prerequisite`
--

DROP TABLE IF EXISTS `prerequisite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prerequisite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course` int(11) DEFAULT NULL,
  `item` int(11) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `reference_link` varchar(70) NOT NULL COMMENT 'Link for a Course or a Book or a Lesson',
  PRIMARY KEY (`id`),
  KEY `course_3_FK_idx` (`course`),
  KEY `item_2_FK_idx` (`item`),
  CONSTRAINT `course_3_FK` FOREIGN KEY (`course`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `item_2_FK` FOREIGN KEY (`item`) REFERENCES `item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prerequisite`
--

LOCK TABLES `prerequisite` WRITE;
/*!40000 ALTER TABLE `prerequisite` DISABLE KEYS */;
/*!40000 ALTER TABLE `prerequisite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` int(11) NOT NULL,
  `item` int(11) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `date_of_question` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `item_1_FK_idx` (`item`),
  KEY `user_1_FK_idx` (`user`),
  CONSTRAINT `item_1_FK` FOREIGN KEY (`item`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_1_FK` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
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
  `password` varchar(75) NOT NULL,
  `email` varchar(45) NOT NULL,
  `user_role` int(11) NOT NULL,
  `date_of_registration` datetime DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `gender` enum('male','femal') NOT NULL,
  `mail_subscribe` tinyint(1) NOT NULL,
  `university` varchar(45) DEFAULT NULL,
  `college` varchar(45) DEFAULT NULL,
  `job` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `profile_pic` varchar(45) DEFAULT NULL,
  `mobile_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_FK_idx` (`user_role`),
  CONSTRAINT `user_role_FK` FOREIGN KEY (`user_role`) REFERENCES `lookup_user_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ahmed_Mater','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','ahmed.motair@gmail.com',2,'2016-10-08 17:05:54','Ahmed','Mater','male',1,'Zagazig University','Engineering','Software Developer','Egypt',NULL,NULL,NULL);
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

-- Dump completed on 2016-11-05 23:54:03
