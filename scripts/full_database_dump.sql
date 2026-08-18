
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES (1,'Admin One','admin1@system.com'),(2,'Admin Two','admin2@system.com'),(3,'Admin Three','admin3@system.com'),(4,'Admin Four','admin4@system.com'),(5,'Admin Five','admin5@system.com');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Artist` (
  `artist_id` int NOT NULL AUTO_INCREMENT,
  `artist_name` varchar(100) NOT NULL,
  `genre` varchar(50) NOT NULL,
  PRIMARY KEY (`artist_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Artist` WRITE;
/*!40000 ALTER TABLE `Artist` DISABLE KEYS */;
INSERT INTO `Artist` VALUES (1,'AR Rahman','Music'),(2,'Kapil Sharma','Comedy'),(3,'Drama Group','Theatre'),(4,'DJ Snake','Music'),(5,'Festival Band','Music'),(6,'AR Rahman','Music'),(7,'Anirudh','Music'),(8,'Kapil Sharma','Comedy'),(9,'Standup Crew','Comedy'),(10,'Coldplay','Music'),(11,'Diljit Dosanjh','Music'),(12,'Arijit Singh','Music'),(13,'Shankar Ehsaan Loy','Music'),(14,'Prateek Kuhad','Music'),(15,'Vir Das','Comedy'),(16,'Zakir Khan','Comedy'),(17,'Kenny Sebastian','Comedy'),(18,'Biswa Kalyan Rath','Comedy'),(19,'Mumbai Indians','Sports'),(20,'CSK','Sports'),(21,'National Theatre Group','Theatre'),(22,'Bollywood Rep Co','Theatre');
/*!40000 ALTER TABLE `Artist` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `booking_date` date NOT NULL,
  `status` varchar(50) DEFAULT 'CONFIRMED',
  PRIMARY KEY (`booking_id`),
  KEY `idx_booking_user` (`user_id`),
  KEY `idx_booking_event` (`event_id`),
  KEY `idx_user_date` (`user_id`,`booking_date` DESC),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `Event` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Booking` WRITE;
/*!40000 ALTER TABLE `Booking` DISABLE KEYS */;
INSERT INTO `Booking` VALUES (1,1,1,'2026-04-01','CANCELLED'),(2,2,1,'2026-04-01','CONFIRMED'),(3,3,2,'2026-04-02','CONFIRMED'),(4,4,3,'2026-04-03','CONFIRMED'),(5,5,4,'2026-04-04','CONFIRMED'),(6,6,5,'2026-04-05','CONFIRMED'),(21,21,2,'2026-04-06','CONFIRMED'),(22,22,3,'2026-04-07','CONFIRMED'),(23,23,7,'2026-05-10','CONFIRMED'),(24,24,8,'2026-05-10','CONFIRMED'),(25,25,9,'2026-05-10','CONFIRMED'),(26,26,10,'2026-05-10','CONFIRMED'),(27,27,11,'2026-05-10','CONFIRMED'),(28,37,5,'2026-05-15','CONFIRMED'),(29,36,4,'2026-05-15','CONFIRMED'),(30,35,3,'2026-05-15','CONFIRMED'),(31,34,2,'2026-05-15','CONFIRMED'),(32,33,1,'2026-05-15','CONFIRMED'),(33,32,11,'2026-05-15','CONFIRMED'),(34,31,10,'2026-05-15','CONFIRMED'),(35,30,9,'2026-05-15','CONFIRMED'),(36,29,8,'2026-05-15','CONFIRMED'),(37,28,7,'2026-05-15','CONFIRMED'),(43,28,7,'2026-05-20','CONFIRMED'),(44,30,4,'2026-05-20','CONFIRMED'),(45,24,8,'2026-05-20','CONFIRMED'),(46,3,7,'2026-05-20','CONFIRMED'),(47,32,10,'2026-05-20','CONFIRMED'),(48,6,5,'2026-05-20','CONFIRMED'),(49,27,6,'2026-05-20','CONFIRMED'),(50,36,2,'2026-05-20','CONFIRMED'),(51,25,3,'2026-05-20','CONFIRMED'),(52,35,8,'2026-05-20','CONFIRMED'),(53,4,9,'2026-05-20','CONFIRMED'),(54,5,11,'2026-05-20','CONFIRMED'),(55,2,3,'2026-05-20','CONFIRMED'),(56,34,4,'2026-05-20','CONFIRMED'),(57,23,1,'2026-05-20','CONFIRMED'),(58,33,2,'2026-05-20','CONFIRMED'),(59,37,8,'2026-05-20','CONFIRMED'),(60,26,10,'2026-05-20','CONFIRMED'),(61,21,2,'2026-05-20','CONFIRMED'),(62,22,4,'2026-05-20','CONFIRMED'),(74,4,1,'2026-05-03','CONFIRMED'),(75,40,6,'2026-05-03','CONFIRMED'),(76,42,6,'2026-05-03','CONFIRMED'),(77,1,4,'2026-05-03','CONFIRMED'),(78,1,8,'2026-05-03','CONFIRMED'),(79,1,7,'2026-05-03','CONFIRMED'),(80,1,6,'2026-05-03','CONFIRMED'),(81,1,33,'2026-05-04','CONFIRMED'),(82,1,18,'2026-07-09','CONFIRMED');
/*!40000 ALTER TABLE `Booking` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Booking_Discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Booking_Discount` (
  `booking_id` int NOT NULL,
  `discount_id` int NOT NULL,
  PRIMARY KEY (`booking_id`,`discount_id`),
  KEY `discount_id` (`discount_id`),
  CONSTRAINT `booking_discount_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `Booking` (`booking_id`) ON DELETE CASCADE,
  CONSTRAINT `booking_discount_ibfk_2` FOREIGN KEY (`discount_id`) REFERENCES `Discount` (`discount_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Booking_Discount` WRITE;
/*!40000 ALTER TABLE `Booking_Discount` DISABLE KEYS */;
INSERT INTO `Booking_Discount` VALUES (1,1),(6,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `Booking_Discount` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `booking_view`;
/*!50001 DROP VIEW IF EXISTS `booking_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `booking_view` AS SELECT 
 1 AS `name`,
 1 AS `event_name`,
 1 AS `booking_date`*/;
SET character_set_client = @saved_cs_client;
DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (1,'Movie'),(2,'Concert'),(3,'Theatre'),(4,'Comedy Show'),(5,'Festival'),(6,'Movie'),(7,'Concert'),(8,'Comedy'),(9,'Festival'),(10,'Sports');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Discount` (
  `discount_id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `percentage` decimal(5,2) NOT NULL,
  `expiry_date` date NOT NULL,
  PRIMARY KEY (`discount_id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Discount` WRITE;
/*!40000 ALTER TABLE `Discount` DISABLE KEYS */;
INSERT INTO `Discount` VALUES (1,'NEWUSER',10.00,'2026-12-31'),(2,'FESTIVE',20.00,'2026-11-30'),(3,'SUMMER',15.00,'2026-08-31'),(4,'SPECIAL',25.00,'2026-09-30'),(5,'VIP',30.00,'2026-10-31'),(6,'NEW10',10.00,'2026-12-31'),(7,'FEST20',20.00,'2026-10-31');
/*!40000 ALTER TABLE `Discount` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(150) NOT NULL,
  `event_date` date NOT NULL,
  `venue_id` int NOT NULL,
  `category_id` int NOT NULL,
  `organizer_id` int NOT NULL,
  `admin_id` int NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `venue_id` (`venue_id`),
  KEY `category_id` (`category_id`),
  KEY `organizer_id` (`organizer_id`),
  KEY `admin_id` (`admin_id`),
  KEY `idx_event_date` (`event_date`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`venue_id`) REFERENCES `Venue` (`venue_id`) ON DELETE CASCADE,
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`),
  CONSTRAINT `event_ibfk_3` FOREIGN KEY (`organizer_id`) REFERENCES `Organizer` (`organizer_id`),
  CONSTRAINT `event_ibfk_4` FOREIGN KEY (`admin_id`) REFERENCES `Admin` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
INSERT INTO `Event` VALUES (1,'Avengers Movie Night','2026-04-10',1,1,1,1),(2,'AR Rahman Concert','2026-05-05',2,2,2,2),(3,'Drama Night','2026-04-20',3,3,3,3),(4,'Stand-up Comedy','2026-06-01',4,4,4,4),(5,'Spring Festival','2026-07-15',5,5,5,5),(6,'Avengers: Endgame Special Screening','2026-06-10',1,1,1,1),(7,'Interstellar Screening','2026-06-11',1,1,1,1),(8,'AR Rahman Live','2026-06-15',2,2,1,1),(9,'Anirudh Concert','2026-06-18',2,2,1,1),(10,'Standup Comedy Night','2026-06-20',3,3,1,1),(11,'Mega Festival','2026-06-25',4,4,1,1),(12,'Jawan 2','2026-07-17',6,1,1,1),(13,'Stree 3: The Final Chapter','2026-08-07',8,1,1,1),(14,'Kalki Part 2','2026-09-18',7,1,1,1),(15,'RRR 2: Rise Again','2026-10-23',1,1,1,1),(16,'Singham Returns Again','2026-11-06',6,1,1,1),(17,'Devara Part 2','2026-12-11',8,1,1,1),(18,'Fighter 2','2026-08-21',7,1,1,1),(19,'Pathaan 2','2026-09-04',1,1,1,1),(20,'Coldplay: Music of the Spheres India Tour','2026-09-10',11,2,7,1),(21,'Diljit Dosanjh: Dil-Luminati 2.0','2026-08-16',12,2,10,1),(22,'Arijit Singh Live in Concert','2026-07-26',2,2,7,1),(23,'Shankar Ehsaan Loy: Journey of Music','2026-06-28',14,2,11,1),(24,'Prateek Kuhad: The Quiet Sessions','2026-07-11',16,2,11,1),(25,'Nucleya Bass Yatra Live','2026-10-04',4,2,10,1),(26,'Indian Ocean: Silver Jubilee Tour','2026-11-08',15,2,11,1),(27,'Vir Das: Wanted (India Stop)','2026-07-05',5,4,9,1),(28,'Zakir Khan: Haq Se Single 3','2026-06-27',3,4,9,1),(29,'Kenny Sebastian: The Quiet Show','2026-08-09',14,4,9,1),(30,'Biswa Kalyan Rath: Biswa Mast Aadmi','2026-09-03',16,4,9,1),(31,'Sumukhi Suresh: She Said What','2026-10-17',3,4,9,1),(32,'Kanan Gill: Is This It','2026-11-21',14,4,9,1),(33,'IPL 2026 Final: MI vs CSK','2026-06-05',10,10,8,1),(34,'Pro Kabaddi League Grand Finale','2026-07-20',12,10,8,1),(35,'India vs South Africa T20I','2026-08-03',13,10,8,1),(36,'Badminton: India Open Super 750','2026-09-14',12,10,8,1),(37,'ISL Final: Bengaluru FC vs Mumbai City','2026-10-11',11,10,8,1),(38,'India vs Australia Test Match Day 1','2026-11-27',10,10,8,1),(39,'WWE Supershow Live in India','2026-12-06',11,10,8,1),(40,'Mughal-E-Azam: The Musical','2026-07-08',15,3,3,1),(41,'Sound of Music: Live!','2026-08-22',14,3,3,1),(42,'Hamlet: A Modern Retelling','2026-09-19',3,3,3,1),(43,'The Mahabharata Trilogy','2026-10-30',15,3,3,1),(44,'Bacardi NH7 Weekender 2026','2026-10-18',4,5,5,1),(45,'Sunburn Festival 2026','2026-12-27',11,5,10,1),(46,'Lollapalooza India 2026','2026-11-22',12,5,7,1),(47,'Hornbill Music Festival','2026-12-05',5,5,11,1);
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Event_Artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event_Artist` (
  `event_id` int NOT NULL,
  `artist_id` int NOT NULL,
  PRIMARY KEY (`event_id`,`artist_id`),
  KEY `artist_id` (`artist_id`),
  CONSTRAINT `event_artist_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `Event` (`event_id`) ON DELETE CASCADE,
  CONSTRAINT `event_artist_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `Artist` (`artist_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Event_Artist` WRITE;
/*!40000 ALTER TABLE `Event_Artist` DISABLE KEYS */;
INSERT INTO `Event_Artist` VALUES (2,1),(4,2),(1,3),(3,3),(5,5),(20,10),(21,11),(22,12),(23,13),(24,14),(27,15),(28,16),(29,17),(30,18),(42,21),(43,21),(40,22);
/*!40000 ALTER TABLE `Event_Artist` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Organizer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Organizer` (
  `organizer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  PRIMARY KEY (`organizer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Organizer` WRITE;
/*!40000 ALTER TABLE `Organizer` DISABLE KEYS */;
INSERT INTO `Organizer` VALUES (1,'ABC Entertainment','abc@email.com'),(2,'Star Events','star@email.com'),(3,'Live Nation','live@email.com'),(4,'Fun Times','fun@email.com'),(5,'Mega Events','mega@email.com'),(6,'Global Events','global@email.com'),(7,'BookMyShow Experiences','+91-9000000201'),(8,'Sports Authority Events','+91-9000000202'),(9,'Comedy Store India','+91-9000000203'),(10,'Percept Live','+91-9000000204'),(11,'Only Much Louder','+91-9000000205');
/*!40000 ALTER TABLE `Organizer` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `booking_id` (`booking_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `Booking` (`booking_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
INSERT INTO `Payment` VALUES (1,1,500.00,'UPI','Completed'),(2,2,500.00,'Credit Card','Completed'),(3,3,1200.00,'Debit Card','Completed'),(4,4,700.00,'UPI','Completed'),(5,5,900.00,'Net Banking','Completed'),(6,6,1500.00,'Credit Card','Completed'),(7,21,800.00,'UPI','Completed'),(8,22,500.00,'UPI','Completed'),(21,23,800.00,'UPI','Completed'),(22,24,900.00,'Card','Completed'),(23,25,850.00,'UPI','Completed'),(24,26,700.00,'Cash','Completed'),(25,27,950.00,'Card','Completed'),(26,37,870.00,'UPI','Completed'),(27,36,860.00,'UPI','Completed'),(28,35,850.00,'UPI','Completed'),(29,34,840.00,'UPI','Completed'),(30,33,830.00,'UPI','Completed'),(31,32,820.00,'UPI','Completed'),(32,31,810.00,'UPI','Completed'),(33,30,800.00,'UPI','Completed'),(34,29,790.00,'UPI','Completed'),(35,28,780.00,'UPI','Completed'),(41,74,534.22,'Credit Card','Completed'),(42,75,184.22,'Net Banking','Completed'),(43,76,184.22,'Net Banking','Completed'),(44,77,334.22,'Net Banking','Completed'),(45,78,434.22,'Net Banking','Completed'),(46,79,434.22,'Credit Card','Completed'),(47,80,702.66,'Credit Card','Completed'),(48,81,1105.32,'Credit Card','Completed'),(49,82,1105.32,'Net Banking','Completed');
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `revenue_view`;
/*!50001 DROP VIEW IF EXISTS `revenue_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `revenue_view` AS SELECT 
 1 AS `event_name`,
 1 AS `revenue`*/;
SET character_set_client = @saved_cs_client;
DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `Event` (`event_id`) ON DELETE CASCADE,
  CONSTRAINT `check_rating` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
INSERT INTO `Review` VALUES (1,1,1,5,'Excellent'),(2,2,1,4,'Very good'),(3,3,2,5,'Amazing concert'),(4,4,3,4,'Nice drama'),(5,5,4,3,'Good comedy'),(6,1,5,5,'Fantastic festival'),(7,2,2,5,'New booking added'),(8,3,3,5,'New booking added'),(11,3,3,5,'New booking added'),(12,1,1,5,'New booking added'),(13,2,1,5,'New booking added'),(14,3,2,5,'New booking added'),(15,4,3,5,'New booking added'),(16,5,4,5,'New booking added'),(17,6,5,5,'New booking added'),(18,7,6,5,'New booking added'),(19,8,2,5,'New booking added'),(20,9,3,5,'New booking added'),(21,10,4,5,'New booking added'),(22,1,1,5,'Great movie'),(23,2,1,4,'Nice'),(24,3,2,5,'Amazing'),(25,4,3,5,'Best concert'),(26,5,4,4,'Good show'),(27,1,1,5,'New booking added'),(28,2,1,5,'New booking added'),(29,3,2,5,'New booking added'),(30,4,3,5,'New booking added'),(31,5,4,5,'New booking added'),(32,6,5,5,'New booking added'),(33,21,2,5,'New booking added'),(34,22,3,5,'New booking added'),(35,1,1,5,'Amazing event'),(36,2,2,4,'Great performance'),(37,3,3,5,'Loved it'),(38,4,4,3,'Good'),(39,5,5,4,'Nice experience'),(40,23,7,5,'New booking added'),(41,24,8,5,'New booking added'),(42,25,9,5,'New booking added'),(43,26,10,5,'New booking added'),(44,27,11,5,'New booking added'),(45,37,5,5,'New booking added'),(46,36,4,5,'New booking added'),(47,35,3,5,'New booking added'),(48,34,2,5,'New booking added'),(49,33,1,5,'New booking added'),(50,32,11,5,'New booking added'),(51,31,10,5,'New booking added'),(52,30,9,5,'New booking added'),(53,29,8,5,'New booking added'),(54,28,7,5,'New booking added'),(55,28,7,5,'New booking added'),(56,30,4,5,'New booking added'),(57,24,8,5,'New booking added'),(58,3,7,5,'New booking added'),(59,32,10,5,'New booking added'),(60,6,5,5,'New booking added'),(61,27,6,5,'New booking added'),(62,36,2,5,'New booking added'),(63,25,3,5,'New booking added'),(64,35,8,5,'New booking added'),(65,4,9,5,'New booking added'),(66,5,11,5,'New booking added'),(67,2,3,5,'New booking added'),(68,34,4,5,'New booking added'),(69,23,1,5,'New booking added'),(70,33,2,5,'New booking added'),(71,37,8,5,'New booking added'),(72,26,10,5,'New booking added'),(73,21,2,5,'New booking added'),(74,22,4,5,'New booking added'),(75,4,1,5,'New booking added'),(76,40,6,5,'New booking added'),(77,40,3,5,'nice movie'),(78,42,6,5,'New booking added'),(79,1,4,5,'New booking added'),(80,1,8,5,'New booking added'),(81,1,7,5,'New booking added'),(82,1,6,5,'New booking added'),(83,1,33,5,'New booking added');
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Seat` (
  `seat_id` int NOT NULL AUTO_INCREMENT,
  `seat_number` varchar(10) NOT NULL,
  `venue_id` int NOT NULL,
  PRIMARY KEY (`seat_id`),
  KEY `venue_id` (`venue_id`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`venue_id`) REFERENCES `Venue` (`venue_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Seat` WRITE;
/*!40000 ALTER TABLE `Seat` DISABLE KEYS */;
INSERT INTO `Seat` VALUES (1,'A1',1),(2,'A2',1),(3,'B1',2),(4,'B2',2),(5,'C1',3),(6,'C2',3),(7,'D1',4),(8,'D2',4),(9,'E1',5),(10,'E2',5),(11,'A1',1),(12,'A2',1),(13,'A3',1),(14,'B1',2),(15,'B2',2),(16,'B3',2),(17,'C1',3),(18,'C2',3),(19,'D1',4),(20,'D2',4),(21,'A01',1),(22,'A02',1),(23,'A03',1),(24,'A04',1),(25,'A05',1),(26,'A06',1),(27,'A07',1),(28,'A08',1),(29,'A09',1),(30,'A10',1),(31,'A11',1),(32,'A12',1),(33,'B01',1),(34,'B02',1),(35,'B03',1),(36,'B04',1),(37,'B05',1),(38,'B06',1),(39,'B07',1),(40,'B08',1),(41,'B09',1),(42,'B10',1),(43,'B11',1),(44,'B12',1),(45,'C01',1),(46,'C02',1),(47,'C03',1),(48,'C04',1),(49,'C05',1),(50,'C06',1),(51,'C07',1),(52,'C08',1),(53,'C09',1),(54,'C10',1),(55,'C11',1),(56,'C12',1),(57,'D01',1),(58,'D02',1),(59,'D03',1),(60,'D04',1),(61,'D05',1),(62,'D06',1),(63,'D07',1),(64,'D08',1),(65,'D09',1),(66,'D10',1),(67,'D11',1),(68,'D12',1),(69,'E01',1),(70,'E02',1),(71,'E03',1),(72,'E04',1),(73,'E05',1),(74,'E06',1),(75,'E07',1),(76,'E08',1),(77,'E09',1),(78,'E10',1),(79,'E11',1),(80,'E12',1),(81,'F01',1),(82,'F02',1),(83,'F03',1),(84,'F04',1),(85,'F05',1),(86,'F06',1),(87,'F07',1),(88,'F08',1),(89,'F09',1),(90,'F10',1),(91,'F11',1),(92,'F12',1),(93,'G01',1),(94,'G02',1),(95,'G03',1),(96,'G04',1),(97,'G05',1),(98,'G06',1),(99,'G07',1),(100,'G08',1),(101,'G09',1),(102,'G10',1),(103,'G11',1),(104,'G12',1),(105,'H01',1),(106,'H02',1),(107,'H03',1),(108,'H04',1),(109,'H05',1),(110,'H06',1),(111,'H07',1),(112,'H08',1),(113,'H09',1),(114,'H10',1),(115,'H11',1),(116,'H12',1),(117,'I01',1),(118,'I02',1),(119,'I03',1),(120,'I04',1),(121,'I05',1),(122,'I06',1),(123,'I07',1),(124,'I08',1),(125,'I09',1),(126,'I10',1),(127,'I11',1),(128,'I12',1),(129,'J01',1),(130,'J02',1),(131,'J03',1),(132,'J04',1),(133,'J05',1),(134,'J06',1),(135,'J07',1),(136,'J08',1),(137,'J09',1),(138,'J10',1),(139,'J11',1),(140,'J12',1),(141,'A01',2),(142,'A02',2),(143,'A03',2),(144,'A04',2),(145,'A05',2),(146,'A06',2),(147,'A07',2),(148,'A08',2),(149,'A09',2),(150,'A10',2),(151,'B01',2),(152,'B02',2),(153,'B03',2),(154,'B04',2),(155,'B05',2),(156,'B06',2),(157,'B07',2),(158,'B08',2),(159,'B09',2),(160,'B10',2),(161,'C01',2),(162,'C02',2),(163,'C03',2),(164,'C04',2),(165,'C05',2),(166,'C06',2),(167,'C07',2),(168,'C08',2),(169,'C09',2),(170,'C10',2),(171,'D01',2),(172,'D02',2),(173,'D03',2),(174,'D04',2),(175,'D05',2),(176,'D06',2),(177,'D07',2),(178,'D08',2),(179,'D09',2),(180,'D10',2),(181,'E01',2),(182,'E02',2),(183,'E03',2),(184,'E04',2),(185,'E05',2),(186,'E06',2),(187,'E07',2),(188,'E08',2),(189,'E09',2),(190,'E10',2),(191,'F01',2),(192,'F02',2),(193,'F03',2),(194,'F04',2),(195,'F05',2),(196,'F06',2),(197,'F07',2),(198,'F08',2),(199,'F09',2),(200,'F10',2),(201,'G01',2),(202,'G02',2),(203,'G03',2),(204,'G04',2),(205,'G05',2),(206,'G06',2),(207,'G07',2),(208,'G08',2),(209,'G09',2),(210,'G10',2),(211,'H01',2),(212,'H02',2),(213,'H03',2),(214,'H04',2),(215,'H05',2),(216,'H06',2),(217,'H07',2),(218,'H08',2),(219,'H09',2),(220,'H10',2),(221,'A01',3),(222,'A02',3),(223,'A03',3),(224,'A04',3),(225,'A05',3),(226,'A06',3),(227,'A07',3),(228,'A08',3),(229,'B01',3),(230,'B02',3),(231,'B03',3),(232,'B04',3),(233,'B05',3),(234,'B06',3),(235,'B07',3),(236,'B08',3),(237,'C01',3),(238,'C02',3),(239,'C03',3),(240,'C04',3),(241,'C05',3),(242,'C06',3),(243,'C07',3),(244,'C08',3),(245,'D01',3),(246,'D02',3),(247,'D03',3),(248,'D04',3),(249,'D05',3),(250,'D06',3),(251,'D07',3),(252,'D08',3),(253,'E01',3),(254,'E02',3),(255,'E03',3),(256,'E04',3),(257,'E05',3),(258,'E06',3),(259,'E07',3),(260,'E08',3),(261,'F01',3),(262,'F02',3),(263,'F03',3),(264,'F04',3),(265,'F05',3),(266,'F06',3),(267,'F07',3),(268,'F08',3),(269,'G01',3),(270,'G02',3),(271,'G03',3),(272,'G04',3),(273,'G05',3),(274,'G06',3),(275,'G07',3),(276,'G08',3),(277,'A01',4),(278,'A02',4),(279,'A03',4),(280,'A04',4),(281,'A05',4),(282,'A06',4),(283,'A07',4),(284,'A08',4),(285,'A09',4),(286,'A10',4),(287,'A11',4),(288,'A12',4),(289,'A13',4),(290,'A14',4),(291,'A15',4),(292,'B01',4),(293,'B02',4),(294,'B03',4),(295,'B04',4),(296,'B05',4),(297,'B06',4),(298,'B07',4),(299,'B08',4),(300,'B09',4),(301,'B10',4),(302,'B11',4),(303,'B12',4),(304,'B13',4),(305,'B14',4),(306,'B15',4),(307,'C01',4),(308,'C02',4),(309,'C03',4),(310,'C04',4),(311,'C05',4),(312,'C06',4),(313,'C07',4),(314,'C08',4),(315,'C09',4),(316,'C10',4),(317,'C11',4),(318,'C12',4),(319,'C13',4),(320,'C14',4),(321,'C15',4),(322,'D01',4),(323,'D02',4),(324,'D03',4),(325,'D04',4),(326,'D05',4),(327,'D06',4),(328,'D07',4),(329,'D08',4),(330,'D09',4),(331,'D10',4),(332,'D11',4),(333,'D12',4),(334,'D13',4),(335,'D14',4),(336,'D15',4),(337,'E01',4),(338,'E02',4),(339,'E03',4),(340,'E04',4),(341,'E05',4),(342,'E06',4),(343,'E07',4),(344,'E08',4),(345,'E09',4),(346,'E10',4),(347,'E11',4),(348,'E12',4),(349,'E13',4),(350,'E14',4),(351,'E15',4),(352,'F01',4),(353,'F02',4),(354,'F03',4),(355,'F04',4),(356,'F05',4),(357,'F06',4),(358,'F07',4),(359,'F08',4),(360,'F09',4),(361,'F10',4),(362,'F11',4),(363,'F12',4),(364,'F13',4),(365,'F14',4),(366,'F15',4),(367,'G01',4),(368,'G02',4),(369,'G03',4),(370,'G04',4),(371,'G05',4),(372,'G06',4),(373,'G07',4),(374,'G08',4),(375,'G09',4),(376,'G10',4),(377,'G11',4),(378,'G12',4),(379,'G13',4),(380,'G14',4),(381,'G15',4),(382,'H01',4),(383,'H02',4),(384,'H03',4),(385,'H04',4),(386,'H05',4),(387,'H06',4),(388,'H07',4),(389,'H08',4),(390,'H09',4),(391,'H10',4),(392,'H11',4),(393,'H12',4),(394,'H13',4),(395,'H14',4),(396,'H15',4),(397,'I01',4),(398,'I02',4),(399,'I03',4),(400,'I04',4),(401,'I05',4),(402,'I06',4),(403,'I07',4),(404,'I08',4),(405,'I09',4),(406,'I10',4),(407,'I11',4),(408,'I12',4),(409,'I13',4),(410,'I14',4),(411,'I15',4),(412,'J01',4),(413,'J02',4),(414,'J03',4),(415,'J04',4),(416,'J05',4),(417,'J06',4),(418,'J07',4),(419,'J08',4),(420,'J09',4),(421,'J10',4),(422,'J11',4),(423,'J12',4),(424,'J13',4),(425,'J14',4),(426,'J15',4),(427,'K01',4),(428,'K02',4),(429,'K03',4),(430,'K04',4),(431,'K05',4),(432,'K06',4),(433,'K07',4),(434,'K08',4),(435,'K09',4),(436,'K10',4),(437,'K11',4),(438,'K12',4),(439,'K13',4),(440,'K14',4),(441,'K15',4),(442,'L01',4),(443,'L02',4),(444,'L03',4),(445,'L04',4),(446,'L05',4),(447,'L06',4),(448,'L07',4),(449,'L08',4),(450,'L09',4),(451,'L10',4),(452,'L11',4),(453,'L12',4),(454,'L13',4),(455,'L14',4),(456,'L15',4),(457,'A01',5),(458,'A02',5),(459,'A03',5),(460,'A04',5),(461,'A05',5),(462,'A06',5),(463,'A07',5),(464,'A08',5),(465,'A09',5),(466,'A10',5),(467,'B01',5),(468,'B02',5),(469,'B03',5),(470,'B04',5),(471,'B05',5),(472,'B06',5),(473,'B07',5),(474,'B08',5),(475,'B09',5),(476,'B10',5),(477,'C01',5),(478,'C02',5),(479,'C03',5),(480,'C04',5),(481,'C05',5),(482,'C06',5),(483,'C07',5),(484,'C08',5),(485,'C09',5),(486,'C10',5),(487,'D01',5),(488,'D02',5),(489,'D03',5),(490,'D04',5),(491,'D05',5),(492,'D06',5),(493,'D07',5),(494,'D08',5),(495,'D09',5),(496,'D10',5),(497,'E01',5),(498,'E02',5),(499,'E03',5),(500,'E04',5),(501,'E05',5),(502,'E06',5),(503,'E07',5),(504,'E08',5),(505,'E09',5),(506,'E10',5),(507,'F01',5),(508,'F02',5),(509,'F03',5),(510,'F04',5),(511,'F05',5),(512,'F06',5),(513,'F07',5),(514,'F08',5),(515,'F09',5),(516,'F10',5),(517,'J01',6),(518,'J01',7),(519,'J01',8),(520,'J01',9),(521,'I01',6),(522,'I01',7),(523,'I01',8),(524,'I01',9),(525,'H01',6),(526,'H01',7),(527,'H01',8),(528,'H01',9),(529,'G01',6),(530,'G01',7),(531,'G01',8),(532,'G01',9),(533,'F01',6),(534,'F01',7),(535,'F01',8),(536,'F01',9),(537,'E01',6),(538,'E01',7),(539,'E01',8),(540,'E01',9),(541,'D01',6),(542,'D01',7),(543,'D01',8),(544,'D01',9),(545,'C01',6),(546,'C01',7),(547,'C01',8),(548,'C01',9),(549,'B01',6),(550,'B01',7),(551,'B01',8),(552,'B01',9),(553,'A01',6),(554,'A01',7),(555,'A01',8),(556,'A01',9),(557,'J02',6),(558,'J02',7),(559,'J02',8),(560,'J02',9),(561,'I02',6),(562,'I02',7),(563,'I02',8),(564,'I02',9),(565,'H02',6),(566,'H02',7),(567,'H02',8),(568,'H02',9),(569,'G02',6),(570,'G02',7),(571,'G02',8),(572,'G02',9),(573,'F02',6),(574,'F02',7),(575,'F02',8),(576,'F02',9),(577,'E02',6),(578,'E02',7),(579,'E02',8),(580,'E02',9),(581,'D02',6),(582,'D02',7),(583,'D02',8),(584,'D02',9),(585,'C02',6),(586,'C02',7),(587,'C02',8),(588,'C02',9),(589,'B02',6),(590,'B02',7),(591,'B02',8),(592,'B02',9),(593,'A02',6),(594,'A02',7),(595,'A02',8),(596,'A02',9),(597,'J03',6),(598,'J03',7),(599,'J03',8),(600,'J03',9),(601,'I03',6),(602,'I03',7),(603,'I03',8),(604,'I03',9),(605,'H03',6),(606,'H03',7),(607,'H03',8),(608,'H03',9),(609,'G03',6),(610,'G03',7),(611,'G03',8),(612,'G03',9),(613,'F03',6),(614,'F03',7),(615,'F03',8),(616,'F03',9),(617,'E03',6),(618,'E03',7),(619,'E03',8),(620,'E03',9),(621,'D03',6),(622,'D03',7),(623,'D03',8),(624,'D03',9),(625,'C03',6),(626,'C03',7),(627,'C03',8),(628,'C03',9),(629,'B03',6),(630,'B03',7),(631,'B03',8),(632,'B03',9),(633,'A03',6),(634,'A03',7),(635,'A03',8),(636,'A03',9),(637,'J04',6),(638,'J04',7),(639,'J04',8),(640,'J04',9),(641,'I04',6),(642,'I04',7),(643,'I04',8),(644,'I04',9),(645,'H04',6),(646,'H04',7),(647,'H04',8),(648,'H04',9),(649,'G04',6),(650,'G04',7),(651,'G04',8),(652,'G04',9),(653,'F04',6),(654,'F04',7),(655,'F04',8),(656,'F04',9),(657,'E04',6),(658,'E04',7),(659,'E04',8),(660,'E04',9),(661,'D04',6),(662,'D04',7),(663,'D04',8),(664,'D04',9),(665,'C04',6),(666,'C04',7),(667,'C04',8),(668,'C04',9),(669,'B04',6),(670,'B04',7),(671,'B04',8),(672,'B04',9),(673,'A04',6),(674,'A04',7),(675,'A04',8),(676,'A04',9),(677,'J05',6),(678,'J05',7),(679,'J05',8),(680,'J05',9),(681,'I05',6),(682,'I05',7),(683,'I05',8),(684,'I05',9),(685,'H05',6),(686,'H05',7),(687,'H05',8),(688,'H05',9),(689,'G05',6),(690,'G05',7),(691,'G05',8),(692,'G05',9),(693,'F05',6),(694,'F05',7),(695,'F05',8),(696,'F05',9),(697,'E05',6),(698,'E05',7),(699,'E05',8),(700,'E05',9),(701,'D05',6),(702,'D05',7),(703,'D05',8),(704,'D05',9),(705,'C05',6),(706,'C05',7),(707,'C05',8),(708,'C05',9),(709,'B05',6),(710,'B05',7),(711,'B05',8),(712,'B05',9),(713,'A05',6),(714,'A05',7),(715,'A05',8),(716,'A05',9),(717,'J06',6),(718,'J06',7),(719,'J06',8),(720,'J06',9),(721,'I06',6),(722,'I06',7),(723,'I06',8),(724,'I06',9),(725,'H06',6),(726,'H06',7),(727,'H06',8),(728,'H06',9),(729,'G06',6),(730,'G06',7),(731,'G06',8),(732,'G06',9),(733,'F06',6),(734,'F06',7),(735,'F06',8),(736,'F06',9),(737,'E06',6),(738,'E06',7),(739,'E06',8),(740,'E06',9),(741,'D06',6),(742,'D06',7),(743,'D06',8),(744,'D06',9),(745,'C06',6),(746,'C06',7),(747,'C06',8),(748,'C06',9),(749,'B06',6),(750,'B06',7),(751,'B06',8),(752,'B06',9),(753,'A06',6),(754,'A06',7),(755,'A06',8),(756,'A06',9),(757,'J07',6),(758,'J07',7),(759,'J07',8),(760,'J07',9),(761,'I07',6),(762,'I07',7),(763,'I07',8),(764,'I07',9),(765,'H07',6),(766,'H07',7),(767,'H07',8),(768,'H07',9),(769,'G07',6),(770,'G07',7),(771,'G07',8),(772,'G07',9),(773,'F07',6),(774,'F07',7),(775,'F07',8),(776,'F07',9),(777,'E07',6),(778,'E07',7),(779,'E07',8),(780,'E07',9),(781,'D07',6),(782,'D07',7),(783,'D07',8),(784,'D07',9),(785,'C07',6),(786,'C07',7),(787,'C07',8),(788,'C07',9),(789,'B07',6),(790,'B07',7),(791,'B07',8),(792,'B07',9),(793,'A07',6),(794,'A07',7),(795,'A07',8),(796,'A07',9),(797,'J08',6),(798,'J08',7),(799,'J08',8),(800,'J08',9),(801,'I08',6),(802,'I08',7),(803,'I08',8),(804,'I08',9),(805,'H08',6),(806,'H08',7),(807,'H08',8),(808,'H08',9),(809,'G08',6),(810,'G08',7),(811,'G08',8),(812,'G08',9),(813,'F08',6),(814,'F08',7),(815,'F08',8),(816,'F08',9),(817,'E08',6),(818,'E08',7),(819,'E08',8),(820,'E08',9),(821,'D08',6),(822,'D08',7),(823,'D08',8),(824,'D08',9),(825,'C08',6),(826,'C08',7),(827,'C08',8),(828,'C08',9),(829,'B08',6),(830,'B08',7),(831,'B08',8),(832,'B08',9),(833,'A08',6),(834,'A08',7),(835,'A08',8),(836,'A08',9),(837,'J09',6),(838,'J09',7),(839,'J09',8),(840,'J09',9),(841,'I09',6),(842,'I09',7),(843,'I09',8),(844,'I09',9),(845,'H09',6),(846,'H09',7),(847,'H09',8),(848,'H09',9),(849,'G09',6),(850,'G09',7),(851,'G09',8),(852,'G09',9),(853,'F09',6),(854,'F09',7),(855,'F09',8),(856,'F09',9),(857,'E09',6),(858,'E09',7),(859,'E09',8),(860,'E09',9),(861,'D09',6),(862,'D09',7),(863,'D09',8),(864,'D09',9),(865,'C09',6),(866,'C09',7),(867,'C09',8),(868,'C09',9),(869,'B09',6),(870,'B09',7),(871,'B09',8),(872,'B09',9),(873,'A09',6),(874,'A09',7),(875,'A09',8),(876,'A09',9),(877,'J10',6),(878,'J10',7),(879,'J10',8),(880,'J10',9),(881,'I10',6),(882,'I10',7),(883,'I10',8),(884,'I10',9),(885,'H10',6),(886,'H10',7),(887,'H10',8),(888,'H10',9),(889,'G10',6),(890,'G10',7),(891,'G10',8),(892,'G10',9),(893,'F10',6),(894,'F10',7),(895,'F10',8),(896,'F10',9),(897,'E10',6),(898,'E10',7),(899,'E10',8),(900,'E10',9),(901,'D10',6),(902,'D10',7),(903,'D10',8),(904,'D10',9),(905,'C10',6),(906,'C10',7),(907,'C10',8),(908,'C10',9),(909,'B10',6),(910,'B10',7),(911,'B10',8),(912,'B10',9),(913,'A10',6),(914,'A10',7),(915,'A10',8),(916,'A10',9),(917,'J11',6),(918,'J11',7),(919,'J11',8),(920,'J11',9),(921,'I11',6),(922,'I11',7),(923,'I11',8),(924,'I11',9),(925,'H11',6),(926,'H11',7),(927,'H11',8),(928,'H11',9),(929,'G11',6),(930,'G11',7),(931,'G11',8),(932,'G11',9),(933,'F11',6),(934,'F11',7),(935,'F11',8),(936,'F11',9),(937,'E11',6),(938,'E11',7),(939,'E11',8),(940,'E11',9),(941,'D11',6),(942,'D11',7),(943,'D11',8),(944,'D11',9),(945,'C11',6),(946,'C11',7),(947,'C11',8),(948,'C11',9),(949,'B11',6),(950,'B11',7),(951,'B11',8),(952,'B11',9),(953,'A11',6),(954,'A11',7),(955,'A11',8),(956,'A11',9),(957,'J12',6),(958,'J12',7),(959,'J12',8),(960,'J12',9),(961,'I12',6),(962,'I12',7),(963,'I12',8),(964,'I12',9),(965,'H12',6),(966,'H12',7),(967,'H12',8),(968,'H12',9),(969,'G12',6),(970,'G12',7),(971,'G12',8),(972,'G12',9),(973,'F12',6),(974,'F12',7),(975,'F12',8),(976,'F12',9),(977,'E12',6),(978,'E12',7),(979,'E12',8),(980,'E12',9),(981,'D12',6),(982,'D12',7),(983,'D12',8),(984,'D12',9),(985,'C12',6),(986,'C12',7),(987,'C12',8),(988,'C12',9),(989,'B12',6),(990,'B12',7),(991,'B12',8),(992,'B12',9),(993,'A12',6),(994,'A12',7),(995,'A12',8),(996,'A12',9),(1028,'L01',10),(1029,'L01',11),(1030,'L01',12),(1031,'L01',13),(1032,'K01',10),(1033,'K01',11),(1034,'K01',12),(1035,'K01',13),(1036,'J01',10),(1037,'J01',11),(1038,'J01',12),(1039,'J01',13),(1040,'I01',10),(1041,'I01',11),(1042,'I01',12),(1043,'I01',13),(1044,'H01',10),(1045,'H01',11),(1046,'H01',12),(1047,'H01',13),(1048,'G01',10),(1049,'G01',11),(1050,'G01',12),(1051,'G01',13),(1052,'F01',10),(1053,'F01',11),(1054,'F01',12),(1055,'F01',13),(1056,'E01',10),(1057,'E01',11),(1058,'E01',12),(1059,'E01',13),(1060,'D01',10),(1061,'D01',11),(1062,'D01',12),(1063,'D01',13),(1064,'C01',10),(1065,'C01',11),(1066,'C01',12),(1067,'C01',13),(1068,'B01',10),(1069,'B01',11),(1070,'B01',12),(1071,'B01',13),(1072,'A01',10),(1073,'A01',11),(1074,'A01',12),(1075,'A01',13),(1076,'L02',10),(1077,'L02',11),(1078,'L02',12),(1079,'L02',13),(1080,'K02',10),(1081,'K02',11),(1082,'K02',12),(1083,'K02',13),(1084,'J02',10),(1085,'J02',11),(1086,'J02',12),(1087,'J02',13),(1088,'I02',10),(1089,'I02',11),(1090,'I02',12),(1091,'I02',13),(1092,'H02',10),(1093,'H02',11),(1094,'H02',12),(1095,'H02',13),(1096,'G02',10),(1097,'G02',11),(1098,'G02',12),(1099,'G02',13),(1100,'F02',10),(1101,'F02',11),(1102,'F02',12),(1103,'F02',13),(1104,'E02',10),(1105,'E02',11),(1106,'E02',12),(1107,'E02',13),(1108,'D02',10),(1109,'D02',11),(1110,'D02',12),(1111,'D02',13),(1112,'C02',10),(1113,'C02',11),(1114,'C02',12),(1115,'C02',13),(1116,'B02',10),(1117,'B02',11),(1118,'B02',12),(1119,'B02',13),(1120,'A02',10),(1121,'A02',11),(1122,'A02',12),(1123,'A02',13),(1124,'L03',10),(1125,'L03',11),(1126,'L03',12),(1127,'L03',13),(1128,'K03',10),(1129,'K03',11),(1130,'K03',12),(1131,'K03',13),(1132,'J03',10),(1133,'J03',11),(1134,'J03',12),(1135,'J03',13),(1136,'I03',10),(1137,'I03',11),(1138,'I03',12),(1139,'I03',13),(1140,'H03',10),(1141,'H03',11),(1142,'H03',12),(1143,'H03',13),(1144,'G03',10),(1145,'G03',11),(1146,'G03',12),(1147,'G03',13),(1148,'F03',10),(1149,'F03',11),(1150,'F03',12),(1151,'F03',13),(1152,'E03',10),(1153,'E03',11),(1154,'E03',12),(1155,'E03',13),(1156,'D03',10),(1157,'D03',11),(1158,'D03',12),(1159,'D03',13),(1160,'C03',10),(1161,'C03',11),(1162,'C03',12),(1163,'C03',13),(1164,'B03',10),(1165,'B03',11),(1166,'B03',12),(1167,'B03',13),(1168,'A03',10),(1169,'A03',11),(1170,'A03',12),(1171,'A03',13),(1172,'L04',10),(1173,'L04',11),(1174,'L04',12),(1175,'L04',13),(1176,'K04',10),(1177,'K04',11),(1178,'K04',12),(1179,'K04',13),(1180,'J04',10),(1181,'J04',11),(1182,'J04',12),(1183,'J04',13),(1184,'I04',10),(1185,'I04',11),(1186,'I04',12),(1187,'I04',13),(1188,'H04',10),(1189,'H04',11),(1190,'H04',12),(1191,'H04',13),(1192,'G04',10),(1193,'G04',11),(1194,'G04',12),(1195,'G04',13),(1196,'F04',10),(1197,'F04',11),(1198,'F04',12),(1199,'F04',13),(1200,'E04',10),(1201,'E04',11),(1202,'E04',12),(1203,'E04',13),(1204,'D04',10),(1205,'D04',11),(1206,'D04',12),(1207,'D04',13),(1208,'C04',10),(1209,'C04',11),(1210,'C04',12),(1211,'C04',13),(1212,'B04',10),(1213,'B04',11),(1214,'B04',12),(1215,'B04',13),(1216,'A04',10),(1217,'A04',11),(1218,'A04',12),(1219,'A04',13),(1220,'L05',10),(1221,'L05',11),(1222,'L05',12),(1223,'L05',13),(1224,'K05',10),(1225,'K05',11),(1226,'K05',12),(1227,'K05',13),(1228,'J05',10),(1229,'J05',11),(1230,'J05',12),(1231,'J05',13),(1232,'I05',10),(1233,'I05',11),(1234,'I05',12),(1235,'I05',13),(1236,'H05',10),(1237,'H05',11),(1238,'H05',12),(1239,'H05',13),(1240,'G05',10),(1241,'G05',11),(1242,'G05',12),(1243,'G05',13),(1244,'F05',10),(1245,'F05',11),(1246,'F05',12),(1247,'F05',13),(1248,'E05',10),(1249,'E05',11),(1250,'E05',12),(1251,'E05',13),(1252,'D05',10),(1253,'D05',11),(1254,'D05',12),(1255,'D05',13),(1256,'C05',10),(1257,'C05',11),(1258,'C05',12),(1259,'C05',13),(1260,'B05',10),(1261,'B05',11),(1262,'B05',12),(1263,'B05',13),(1264,'A05',10),(1265,'A05',11),(1266,'A05',12),(1267,'A05',13),(1268,'L06',10),(1269,'L06',11),(1270,'L06',12),(1271,'L06',13),(1272,'K06',10),(1273,'K06',11),(1274,'K06',12),(1275,'K06',13),(1276,'J06',10),(1277,'J06',11),(1278,'J06',12),(1279,'J06',13),(1280,'I06',10),(1281,'I06',11),(1282,'I06',12),(1283,'I06',13),(1284,'H06',10),(1285,'H06',11),(1286,'H06',12),(1287,'H06',13),(1288,'G06',10),(1289,'G06',11),(1290,'G06',12),(1291,'G06',13),(1292,'F06',10),(1293,'F06',11),(1294,'F06',12),(1295,'F06',13),(1296,'E06',10),(1297,'E06',11),(1298,'E06',12),(1299,'E06',13),(1300,'D06',10),(1301,'D06',11),(1302,'D06',12),(1303,'D06',13),(1304,'C06',10),(1305,'C06',11),(1306,'C06',12),(1307,'C06',13),(1308,'B06',10),(1309,'B06',11),(1310,'B06',12),(1311,'B06',13),(1312,'A06',10),(1313,'A06',11),(1314,'A06',12),(1315,'A06',13),(1316,'L07',10),(1317,'L07',11),(1318,'L07',12),(1319,'L07',13),(1320,'K07',10),(1321,'K07',11),(1322,'K07',12),(1323,'K07',13),(1324,'J07',10),(1325,'J07',11),(1326,'J07',12),(1327,'J07',13),(1328,'I07',10),(1329,'I07',11),(1330,'I07',12),(1331,'I07',13),(1332,'H07',10),(1333,'H07',11),(1334,'H07',12),(1335,'H07',13),(1336,'G07',10),(1337,'G07',11),(1338,'G07',12),(1339,'G07',13),(1340,'F07',10),(1341,'F07',11),(1342,'F07',12),(1343,'F07',13),(1344,'E07',10),(1345,'E07',11),(1346,'E07',12),(1347,'E07',13),(1348,'D07',10),(1349,'D07',11),(1350,'D07',12),(1351,'D07',13),(1352,'C07',10),(1353,'C07',11),(1354,'C07',12),(1355,'C07',13),(1356,'B07',10),(1357,'B07',11),(1358,'B07',12),(1359,'B07',13),(1360,'A07',10),(1361,'A07',11),(1362,'A07',12),(1363,'A07',13),(1364,'L08',10),(1365,'L08',11),(1366,'L08',12),(1367,'L08',13),(1368,'K08',10),(1369,'K08',11),(1370,'K08',12),(1371,'K08',13),(1372,'J08',10),(1373,'J08',11),(1374,'J08',12),(1375,'J08',13),(1376,'I08',10),(1377,'I08',11),(1378,'I08',12),(1379,'I08',13),(1380,'H08',10),(1381,'H08',11),(1382,'H08',12),(1383,'H08',13),(1384,'G08',10),(1385,'G08',11),(1386,'G08',12),(1387,'G08',13),(1388,'F08',10),(1389,'F08',11),(1390,'F08',12),(1391,'F08',13),(1392,'E08',10),(1393,'E08',11),(1394,'E08',12),(1395,'E08',13),(1396,'D08',10),(1397,'D08',11),(1398,'D08',12),(1399,'D08',13),(1400,'C08',10),(1401,'C08',11),(1402,'C08',12),(1403,'C08',13),(1404,'B08',10),(1405,'B08',11),(1406,'B08',12),(1407,'B08',13),(1408,'A08',10),(1409,'A08',11),(1410,'A08',12),(1411,'A08',13),(1412,'L09',10),(1413,'L09',11),(1414,'L09',12),(1415,'L09',13),(1416,'K09',10),(1417,'K09',11),(1418,'K09',12),(1419,'K09',13),(1420,'J09',10),(1421,'J09',11),(1422,'J09',12),(1423,'J09',13),(1424,'I09',10),(1425,'I09',11),(1426,'I09',12),(1427,'I09',13),(1428,'H09',10),(1429,'H09',11),(1430,'H09',12),(1431,'H09',13),(1432,'G09',10),(1433,'G09',11),(1434,'G09',12),(1435,'G09',13),(1436,'F09',10),(1437,'F09',11),(1438,'F09',12),(1439,'F09',13),(1440,'E09',10),(1441,'E09',11),(1442,'E09',12),(1443,'E09',13),(1444,'D09',10),(1445,'D09',11),(1446,'D09',12),(1447,'D09',13),(1448,'C09',10),(1449,'C09',11),(1450,'C09',12),(1451,'C09',13),(1452,'B09',10),(1453,'B09',11),(1454,'B09',12),(1455,'B09',13),(1456,'A09',10),(1457,'A09',11),(1458,'A09',12),(1459,'A09',13),(1460,'L10',10),(1461,'L10',11),(1462,'L10',12),(1463,'L10',13),(1464,'K10',10),(1465,'K10',11),(1466,'K10',12),(1467,'K10',13),(1468,'J10',10),(1469,'J10',11),(1470,'J10',12),(1471,'J10',13),(1472,'I10',10),(1473,'I10',11),(1474,'I10',12),(1475,'I10',13),(1476,'H10',10),(1477,'H10',11),(1478,'H10',12),(1479,'H10',13),(1480,'G10',10),(1481,'G10',11),(1482,'G10',12),(1483,'G10',13),(1484,'F10',10),(1485,'F10',11),(1486,'F10',12),(1487,'F10',13),(1488,'E10',10),(1489,'E10',11),(1490,'E10',12),(1491,'E10',13),(1492,'D10',10),(1493,'D10',11),(1494,'D10',12),(1495,'D10',13),(1496,'C10',10),(1497,'C10',11),(1498,'C10',12),(1499,'C10',13),(1500,'B10',10),(1501,'B10',11),(1502,'B10',12),(1503,'B10',13),(1504,'A10',10),(1505,'A10',11),(1506,'A10',12),(1507,'A10',13),(1508,'L11',10),(1509,'L11',11),(1510,'L11',12),(1511,'L11',13),(1512,'K11',10),(1513,'K11',11),(1514,'K11',12),(1515,'K11',13),(1516,'J11',10),(1517,'J11',11),(1518,'J11',12),(1519,'J11',13),(1520,'I11',10),(1521,'I11',11),(1522,'I11',12),(1523,'I11',13),(1524,'H11',10),(1525,'H11',11),(1526,'H11',12),(1527,'H11',13),(1528,'G11',10),(1529,'G11',11),(1530,'G11',12),(1531,'G11',13),(1532,'F11',10),(1533,'F11',11),(1534,'F11',12),(1535,'F11',13),(1536,'E11',10),(1537,'E11',11),(1538,'E11',12),(1539,'E11',13),(1540,'D11',10),(1541,'D11',11),(1542,'D11',12),(1543,'D11',13),(1544,'C11',10),(1545,'C11',11),(1546,'C11',12),(1547,'C11',13),(1548,'B11',10),(1549,'B11',11),(1550,'B11',12),(1551,'B11',13),(1552,'A11',10),(1553,'A11',11),(1554,'A11',12),(1555,'A11',13),(1556,'L12',10),(1557,'L12',11),(1558,'L12',12),(1559,'L12',13),(1560,'K12',10),(1561,'K12',11),(1562,'K12',12),(1563,'K12',13),(1564,'J12',10),(1565,'J12',11),(1566,'J12',12),(1567,'J12',13),(1568,'I12',10),(1569,'I12',11),(1570,'I12',12),(1571,'I12',13),(1572,'H12',10),(1573,'H12',11),(1574,'H12',12),(1575,'H12',13),(1576,'G12',10),(1577,'G12',11),(1578,'G12',12),(1579,'G12',13),(1580,'F12',10),(1581,'F12',11),(1582,'F12',12),(1583,'F12',13),(1584,'E12',10),(1585,'E12',11),(1586,'E12',12),(1587,'E12',13),(1588,'D12',10),(1589,'D12',11),(1590,'D12',12),(1591,'D12',13),(1592,'C12',10),(1593,'C12',11),(1594,'C12',12),(1595,'C12',13),(1596,'B12',10),(1597,'B12',11),(1598,'B12',12),(1599,'B12',13),(1600,'A12',10),(1601,'A12',11),(1602,'A12',12),(1603,'A12',13),(1604,'L13',10),(1605,'L13',11),(1606,'L13',12),(1607,'L13',13),(1608,'K13',10),(1609,'K13',11),(1610,'K13',12),(1611,'K13',13),(1612,'J13',10),(1613,'J13',11),(1614,'J13',12),(1615,'J13',13),(1616,'I13',10),(1617,'I13',11),(1618,'I13',12),(1619,'I13',13),(1620,'H13',10),(1621,'H13',11),(1622,'H13',12),(1623,'H13',13),(1624,'G13',10),(1625,'G13',11),(1626,'G13',12),(1627,'G13',13),(1628,'F13',10),(1629,'F13',11),(1630,'F13',12),(1631,'F13',13),(1632,'E13',10),(1633,'E13',11),(1634,'E13',12),(1635,'E13',13),(1636,'D13',10),(1637,'D13',11),(1638,'D13',12),(1639,'D13',13),(1640,'C13',10),(1641,'C13',11),(1642,'C13',12),(1643,'C13',13),(1644,'B13',10),(1645,'B13',11),(1646,'B13',12),(1647,'B13',13),(1648,'A13',10),(1649,'A13',11),(1650,'A13',12),(1651,'A13',13),(1652,'L14',10),(1653,'L14',11),(1654,'L14',12),(1655,'L14',13),(1656,'K14',10),(1657,'K14',11),(1658,'K14',12),(1659,'K14',13),(1660,'J14',10),(1661,'J14',11),(1662,'J14',12),(1663,'J14',13),(1664,'I14',10),(1665,'I14',11),(1666,'I14',12),(1667,'I14',13),(1668,'H14',10),(1669,'H14',11),(1670,'H14',12),(1671,'H14',13),(1672,'G14',10),(1673,'G14',11),(1674,'G14',12),(1675,'G14',13),(1676,'F14',10),(1677,'F14',11),(1678,'F14',12),(1679,'F14',13),(1680,'E14',10),(1681,'E14',11),(1682,'E14',12),(1683,'E14',13),(1684,'D14',10),(1685,'D14',11),(1686,'D14',12),(1687,'D14',13),(1688,'C14',10),(1689,'C14',11),(1690,'C14',12),(1691,'C14',13),(1692,'B14',10),(1693,'B14',11),(1694,'B14',12),(1695,'B14',13),(1696,'A14',10),(1697,'A14',11),(1698,'A14',12),(1699,'A14',13),(1700,'L15',10),(1701,'L15',11),(1702,'L15',12),(1703,'L15',13),(1704,'K15',10),(1705,'K15',11),(1706,'K15',12),(1707,'K15',13),(1708,'J15',10),(1709,'J15',11),(1710,'J15',12),(1711,'J15',13),(1712,'I15',10),(1713,'I15',11),(1714,'I15',12),(1715,'I15',13),(1716,'H15',10),(1717,'H15',11),(1718,'H15',12),(1719,'H15',13),(1720,'G15',10),(1721,'G15',11),(1722,'G15',12),(1723,'G15',13),(1724,'F15',10),(1725,'F15',11),(1726,'F15',12),(1727,'F15',13),(1728,'E15',10),(1729,'E15',11),(1730,'E15',12),(1731,'E15',13),(1732,'D15',10),(1733,'D15',11),(1734,'D15',12),(1735,'D15',13),(1736,'C15',10),(1737,'C15',11),(1738,'C15',12),(1739,'C15',13),(1740,'B15',10),(1741,'B15',11),(1742,'B15',12),(1743,'B15',13),(1744,'A15',10),(1745,'A15',11),(1746,'A15',12),(1747,'A15',13),(1748,'L16',10),(1749,'L16',11),(1750,'L16',12),(1751,'L16',13),(1752,'K16',10),(1753,'K16',11),(1754,'K16',12),(1755,'K16',13),(1756,'J16',10),(1757,'J16',11),(1758,'J16',12),(1759,'J16',13),(1760,'I16',10),(1761,'I16',11),(1762,'I16',12),(1763,'I16',13),(1764,'H16',10),(1765,'H16',11),(1766,'H16',12),(1767,'H16',13),(1768,'G16',10),(1769,'G16',11),(1770,'G16',12),(1771,'G16',13),(1772,'F16',10),(1773,'F16',11),(1774,'F16',12),(1775,'F16',13),(1776,'E16',10),(1777,'E16',11),(1778,'E16',12),(1779,'E16',13),(1780,'D16',10),(1781,'D16',11),(1782,'D16',12),(1783,'D16',13),(1784,'C16',10),(1785,'C16',11),(1786,'C16',12),(1787,'C16',13),(1788,'B16',10),(1789,'B16',11),(1790,'B16',12),(1791,'B16',13),(1792,'A16',10),(1793,'A16',11),(1794,'A16',12),(1795,'A16',13),(2051,'H01',14),(2052,'H01',15),(2053,'H01',16),(2054,'G01',14),(2055,'G01',15),(2056,'G01',16),(2057,'F01',14),(2058,'F01',15),(2059,'F01',16),(2060,'E01',14),(2061,'E01',15),(2062,'E01',16),(2063,'D01',14),(2064,'D01',15),(2065,'D01',16),(2066,'C01',14),(2067,'C01',15),(2068,'C01',16),(2069,'B01',14),(2070,'B01',15),(2071,'B01',16),(2072,'A01',14),(2073,'A01',15),(2074,'A01',16),(2075,'H02',14),(2076,'H02',15),(2077,'H02',16),(2078,'G02',14),(2079,'G02',15),(2080,'G02',16),(2081,'F02',14),(2082,'F02',15),(2083,'F02',16),(2084,'E02',14),(2085,'E02',15),(2086,'E02',16),(2087,'D02',14),(2088,'D02',15),(2089,'D02',16),(2090,'C02',14),(2091,'C02',15),(2092,'C02',16),(2093,'B02',14),(2094,'B02',15),(2095,'B02',16),(2096,'A02',14),(2097,'A02',15),(2098,'A02',16),(2099,'H03',14),(2100,'H03',15),(2101,'H03',16),(2102,'G03',14),(2103,'G03',15),(2104,'G03',16),(2105,'F03',14),(2106,'F03',15),(2107,'F03',16),(2108,'E03',14),(2109,'E03',15),(2110,'E03',16),(2111,'D03',14),(2112,'D03',15),(2113,'D03',16),(2114,'C03',14),(2115,'C03',15),(2116,'C03',16),(2117,'B03',14),(2118,'B03',15),(2119,'B03',16),(2120,'A03',14),(2121,'A03',15),(2122,'A03',16),(2123,'H04',14),(2124,'H04',15),(2125,'H04',16),(2126,'G04',14),(2127,'G04',15),(2128,'G04',16),(2129,'F04',14),(2130,'F04',15),(2131,'F04',16),(2132,'E04',14),(2133,'E04',15),(2134,'E04',16),(2135,'D04',14),(2136,'D04',15),(2137,'D04',16),(2138,'C04',14),(2139,'C04',15),(2140,'C04',16),(2141,'B04',14),(2142,'B04',15),(2143,'B04',16),(2144,'A04',14),(2145,'A04',15),(2146,'A04',16),(2147,'H05',14),(2148,'H05',15),(2149,'H05',16),(2150,'G05',14),(2151,'G05',15),(2152,'G05',16),(2153,'F05',14),(2154,'F05',15),(2155,'F05',16),(2156,'E05',14),(2157,'E05',15),(2158,'E05',16),(2159,'D05',14),(2160,'D05',15),(2161,'D05',16),(2162,'C05',14),(2163,'C05',15),(2164,'C05',16),(2165,'B05',14),(2166,'B05',15),(2167,'B05',16),(2168,'A05',14),(2169,'A05',15),(2170,'A05',16),(2171,'H06',14),(2172,'H06',15),(2173,'H06',16),(2174,'G06',14),(2175,'G06',15),(2176,'G06',16),(2177,'F06',14),(2178,'F06',15),(2179,'F06',16),(2180,'E06',14),(2181,'E06',15),(2182,'E06',16),(2183,'D06',14),(2184,'D06',15),(2185,'D06',16),(2186,'C06',14),(2187,'C06',15),(2188,'C06',16),(2189,'B06',14),(2190,'B06',15),(2191,'B06',16),(2192,'A06',14),(2193,'A06',15),(2194,'A06',16),(2195,'H07',14),(2196,'H07',15),(2197,'H07',16),(2198,'G07',14),(2199,'G07',15),(2200,'G07',16),(2201,'F07',14),(2202,'F07',15),(2203,'F07',16),(2204,'E07',14),(2205,'E07',15),(2206,'E07',16),(2207,'D07',14),(2208,'D07',15),(2209,'D07',16),(2210,'C07',14),(2211,'C07',15),(2212,'C07',16),(2213,'B07',14),(2214,'B07',15),(2215,'B07',16),(2216,'A07',14),(2217,'A07',15),(2218,'A07',16),(2219,'H08',14),(2220,'H08',15),(2221,'H08',16),(2222,'G08',14),(2223,'G08',15),(2224,'G08',16),(2225,'F08',14),(2226,'F08',15),(2227,'F08',16),(2228,'E08',14),(2229,'E08',15),(2230,'E08',16),(2231,'D08',14),(2232,'D08',15),(2233,'D08',16),(2234,'C08',14),(2235,'C08',15),(2236,'C08',16),(2237,'B08',14),(2238,'B08',15),(2239,'B08',16),(2240,'A08',14),(2241,'A08',15),(2242,'A08',16),(2243,'H09',14),(2244,'H09',15),(2245,'H09',16),(2246,'G09',14),(2247,'G09',15),(2248,'G09',16),(2249,'F09',14),(2250,'F09',15),(2251,'F09',16),(2252,'E09',14),(2253,'E09',15),(2254,'E09',16),(2255,'D09',14),(2256,'D09',15),(2257,'D09',16),(2258,'C09',14),(2259,'C09',15),(2260,'C09',16),(2261,'B09',14),(2262,'B09',15),(2263,'B09',16),(2264,'A09',14),(2265,'A09',15),(2266,'A09',16),(2267,'H10',14),(2268,'H10',15),(2269,'H10',16),(2270,'G10',14),(2271,'G10',15),(2272,'G10',16),(2273,'F10',14),(2274,'F10',15),(2275,'F10',16),(2276,'E10',14),(2277,'E10',15),(2278,'E10',16),(2279,'D10',14),(2280,'D10',15),(2281,'D10',16),(2282,'C10',14),(2283,'C10',15),(2284,'C10',16),(2285,'B10',14),(2286,'B10',15),(2287,'B10',16),(2288,'A10',14),(2289,'A10',15),(2290,'A10',16);
/*!40000 ALTER TABLE `Seat` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Seat_Lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Seat_Lock` (
  `lock_id` int NOT NULL AUTO_INCREMENT,
  `seat_id` int NOT NULL,
  `event_id` int NOT NULL,
  `user_id` int NOT NULL,
  `lock_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_time` timestamp NOT NULL,
  PRIMARY KEY (`lock_id`),
  UNIQUE KEY `uniq_seat_event` (`seat_id`,`event_id`),
  KEY `fk_lock_event` (`event_id`),
  KEY `fk_lock_user` (`user_id`),
  KEY `idx_expiry` (`expiry_time`),
  CONSTRAINT `fk_lock_event` FOREIGN KEY (`event_id`) REFERENCES `Event` (`event_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_lock_seat` FOREIGN KEY (`seat_id`) REFERENCES `Seat` (`seat_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_lock_user` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Seat_Lock` WRITE;
/*!40000 ALTER TABLE `Seat_Lock` DISABLE KEYS */;
INSERT INTO `Seat_Lock` VALUES (3,4,1,1,'2026-04-15 17:40:18','2026-04-15 17:41:18'),(4,2,1,1,'2026-05-02 15:08:42','2026-05-02 15:13:42'),(5,11,1,1,'2026-05-02 20:53:53','2026-05-02 21:03:53'),(7,13,1,3,'2026-05-02 20:53:53','2026-05-02 21:03:53'),(8,14,2,4,'2026-05-02 20:53:53','2026-05-02 21:03:53'),(9,15,2,5,'2026-05-02 20:53:53','2026-05-02 21:03:53'),(14,28,6,1,'2026-05-03 09:23:49','2026-05-03 09:33:49');
/*!40000 ALTER TABLE `Seat_Lock` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ticket` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `seat_id` int NOT NULL,
  `event_id` int NOT NULL,
  `qr_code` varchar(255) NOT NULL,
  PRIMARY KEY (`ticket_id`),
  UNIQUE KEY `seat_id` (`seat_id`,`event_id`),
  UNIQUE KEY `unique_seat_event` (`seat_id`,`event_id`),
  UNIQUE KEY `uniq_event_seat` (`event_id`,`seat_id`),
  KEY `booking_id` (`booking_id`),
  KEY `event_id` (`event_id`),
  KEY `idx_booking_seat` (`booking_id`,`seat_id`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `Booking` (`booking_id`) ON DELETE CASCADE,
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `Seat` (`seat_id`),
  CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`event_id`) REFERENCES `Event` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Ticket` WRITE;
/*!40000 ALTER TABLE `Ticket` DISABLE KEYS */;
INSERT INTO `Ticket` VALUES (1,1,1,1,'QR001'),(2,2,2,1,'QR002'),(3,3,3,2,'QR003'),(4,4,5,3,'QR004'),(5,5,7,4,'QR005'),(6,6,9,5,'QR006'),(7,21,4,2,'QR_COMMIT'),(22,22,1,3,'QR022'),(23,23,11,7,'QR201'),(24,24,12,8,'QR202'),(25,25,13,9,'QR203'),(26,26,14,10,'QR204'),(27,27,15,11,'QR205'),(43,74,12,1,'BKG-74-S12-776e9cea52d6000e'),(44,75,116,6,'BKG-75-S116-334a8f3da3df1fe9'),(45,76,76,6,'BKG-76-S76-4d444758dba3e7eb'),(46,77,320,4,'BKG-77-S320-f2a18c43140e983d'),(47,78,158,8,'BKG-78-S158-de46527043c03e82'),(48,79,39,7,'BKG-79-S39-be8384ae8dc30053'),(49,80,60,6,'BKG-80-S60-4546061df9ecec4b'),(50,80,61,6,'BKG-80-S61-ab18bac2670bee05'),(51,80,62,6,'BKG-80-S62-699e02cfedebd07e'),(52,81,1508,33,'BKG-81-S1508-3e3795ce9cd4d152'),(53,81,1556,33,'BKG-81-S1556-69fe2fce94b6f431'),(54,81,1604,33,'BKG-81-S1604-b048c79ec042f6b6'),(55,81,1652,33,'BKG-81-S1652-7c263bdae75f7d46'),(56,81,1700,33,'BKG-81-S1700-a1d19707fe6ffb0f'),(57,81,1748,33,'BKG-81-S1748-a30240ff73329de4'),(58,82,734,18,'BKG-82-S734-bf15f2fb0718ace2'),(59,82,774,18,'BKG-82-S774-7ddea7c177fb5e01'),(60,82,814,18,'BKG-82-S814-2e0ba21e484e376c'),(61,82,854,18,'BKG-82-S854-1742931505e7bd8f'),(62,82,894,18,'BKG-82-S894-89ece329f6a18d89'),(63,82,934,18,'BKG-82-S934-5026aec00479732c');
/*!40000 ALTER TABLE `Ticket` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Transaction_Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transaction_Log` (
  `txn_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `action_type` varchar(50) DEFAULT NULL,
  `txn_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`txn_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Transaction_Log` WRITE;
/*!40000 ALTER TABLE `Transaction_Log` DISABLE KEYS */;
INSERT INTO `Transaction_Log` VALUES (1,21,'COMMIT','2026-04-15 18:04:35'),(2,22,'SAVEPOINT','2026-04-15 18:04:35'),(3,22,'ROLLBACK','2026-04-15 18:04:35'),(4,1,'BOOKED','2026-05-02 15:08:41'),(5,2,'BOOKED','2026-05-02 15:08:41'),(6,3,'BOOKED','2026-05-02 15:08:41'),(7,1,'BOOKING CREATED','2026-05-02 20:53:53'),(8,2,'PAYMENT COMPLETED','2026-05-02 20:53:53'),(9,3,'DATA READ','2026-05-02 20:53:53'),(10,4,'BOOKING CREATED','2026-05-02 20:53:53'),(11,5,'PAYMENT COMPLETED','2026-05-02 20:53:53'),(12,6,'DATA READ','2026-05-02 20:53:53'),(13,21,'BOOKING CREATED','2026-05-02 20:53:53'),(14,22,'PAYMENT COMPLETED','2026-05-02 20:53:53');
/*!40000 ALTER TABLE `Transaction_Log` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `transaction_type` varchar(50) DEFAULT NULL,
  `transaction_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;
INSERT INTO `Transactions` VALUES (1,21,'COMMIT','2026-04-15 18:10:50'),(2,22,'SAVEPOINT','2026-04-15 18:10:50'),(3,22,'ROLLBACK','2026-04-15 18:10:50'),(4,1,'COMMIT','2026-05-02 15:08:41'),(5,2,'COMMIT','2026-05-02 15:08:41'),(6,3,'COMMIT','2026-05-02 15:08:41'),(7,1,'WRITE','2026-05-02 20:53:53'),(8,2,'WRITE','2026-05-02 20:53:53'),(9,3,'READ','2026-05-02 20:53:53'),(10,4,'WRITE','2026-05-02 20:53:53'),(11,5,'READ','2026-05-02 20:53:53'),(12,6,'WRITE','2026-05-02 20:53:53'),(13,21,'WRITE','2026-05-02 20:53:53'),(14,22,'READ','2026-05-02 20:53:53'),(15,74,'COMMIT','2026-05-03 05:30:40'),(16,75,'COMMIT','2026-05-03 05:56:44'),(17,76,'COMMIT','2026-05-03 06:18:57'),(18,77,'COMMIT','2026-05-03 06:26:59'),(19,78,'COMMIT','2026-05-03 14:02:02'),(20,79,'COMMIT','2026-05-03 14:20:03'),(21,80,'COMMIT','2026-05-03 16:02:05'),(22,81,'COMMIT','2026-05-04 04:35:06'),(23,82,'COMMIT','2026-07-09 13:27:27');
/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Yash','yash1@gmail.com','9000000001','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(2,'Rahul','rahul2@gmail.com','9000000002','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(3,'Amit','amit3@gmail.com','9000000003','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(4,'Neha','neha4@gmail.com','9000000004','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(5,'Priya','priya5@gmail.com','9000000005','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(6,'Arjun','arjun6@gmail.com','9000000006','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(21,'User21','u21@gmail.com','9000000021','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(22,'User22','u22@gmail.com','9000000022','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(23,'Rohan','rohan@gmail.com','9000000030','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(24,'Aisha','aisha@gmail.com','9000000031','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(25,'Kabir','kabir@gmail.com','9000000032','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(26,'Simran','simran@gmail.com','9000000033','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(27,'Arnav','arnav@gmail.com','9000000034','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(28,'Aarav','aarav1@gmail.com','9000000101','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(29,'Vivaan','vivaan1@gmail.com','9000000102','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(30,'Aditya','aditya1@gmail.com','9000000103','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(31,'Vihaan','vihaan1@gmail.com','9000000104','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(32,'Arjun','arjun1@gmail.com','9000000105','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(33,'Sai','sai1@gmail.com','9000000106','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(34,'Reyansh','reyansh1@gmail.com','9000000107','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(35,'Krishna','krishna1@gmail.com','9000000108','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(36,'Ishaan','ishaan1@gmail.com','9000000109','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(37,'Shaurya','shaurya1@gmail.com','9000000110','$2b$10$3mzPDkDRlPmmx4TAn21JPergdqoi0FxdK3oI5Dvhfq0qAiMHiHSQu',0),(40,'yash','yash2006@gmail.com','9471444635','$2b$10$sPW1mq4xUM9tKhZFZZof8OH4y9FLp0Jh0aZBmz6sbqGczvkMaQKnq',0),(41,'anita','anita2007@gmail.com','9471444536','$2b$10$mw7OpJzCte8lAf2y3cwWceNoym6QROFYWJ/kSDrzt/lLuVqEoDxai',0),(42,'suchita','suchita2005@gmai.com','9471444638','$2b$10$hUqR550mJGbAmdqA25dr5u0iUVZIxlTYDlQ/dNPuXFioWdmXCtSJa',0),(46,'Yash Raj','yashraj@gmail.com','9834562134','$2b$10$jH2pS0HonN0XKuWZWYheX.ZSp.ud9imO4AkVoO.pqIqcuROzFNPM6',0),(47,'Ravi Raj','raviraj2006@gmial.com','9471444642','$2b$10$FB2fhDFhEOhK.6D5Mp4QBu4XDvdy29/mjj76G12fwKyXxjbgMHNlC',0),(48,'Yash Raj','yr6060602@gmail.com','9471444635','$2b$10$SWoErB0DLrpVXsUaBykEWuKdwWd.sTGvTrtYw0kJ8kK2dXf70DQO.',0),(49,'Yash','ys6441@gmail.com','9471444562','$2b$10$UgrB8oGNybeqKtW3wZagqOpB3D.7wsj2d29WLtqRf3LtlGZ30ca4u',0),(50,'Ram','ram2001@gmail.com','8445823472','$2b$10$tJz9DkmwkjBvI/jSjNApeeVlbL7WSbhxtsPNvwgPStg7XolzxhYhS',0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `Venue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Venue` (
  `venue_id` int NOT NULL AUTO_INCREMENT,
  `venue_name` varchar(150) NOT NULL,
  `location` varchar(150) NOT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`venue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `Venue` WRITE;
/*!40000 ALTER TABLE `Venue` DISABLE KEYS */;
INSERT INTO `Venue` VALUES (1,'Grand Cinema Hall','Chennai',300),(2,'Music Arena','Bangalore',500),(3,'City Theatre','Hyderabad',200),(4,'Open Ground','Mumbai',800),(5,'Convention Center','Delhi',600),(6,'PVR Chennai','Chennai',300),(7,'INOX Bangalore','Bangalore',400),(8,'IMAX Hyderabad','Hyderabad',350),(9,'Open Arena Mumbai','Mumbai',800),(10,'Wankhede Stadium','Mumbai',33000),(11,'DY Patil Stadium','Mumbai',55000),(12,'Jawaharlal Nehru Stadium','Delhi',75000),(13,'M. Chinnaswamy Stadium','Bangalore',40000),(14,'HICC Novotel Arena','Hyderabad',5000),(15,'Bharat Mandapam','Delhi',7000),(16,'Forum Mall Amphitheatre','Bangalore',2000);
/*!40000 ALTER TABLE `Venue` ENABLE KEYS */;
UNLOCK TABLES;
/*!50001 DROP VIEW IF EXISTS `booking_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `booking_view` AS select `U`.`name` AS `name`,`E`.`event_name` AS `event_name`,`B`.`booking_date` AS `booking_date` from ((`users` `U` join `booking` `B` on((`U`.`user_id` = `B`.`user_id`))) join `event` `E` on((`B`.`event_id` = `E`.`event_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!50001 DROP VIEW IF EXISTS `revenue_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `revenue_view` AS select `E`.`event_name` AS `event_name`,sum(`P`.`amount`) AS `revenue` from ((`event` `E` join `booking` `B` on((`E`.`event_id` = `B`.`event_id`))) join `payment` `P` on((`B`.`booking_id` = `P`.`booking_id`))) group by `E`.`event_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

