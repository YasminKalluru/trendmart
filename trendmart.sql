CREATE DATABASE  IF NOT EXISTS `trendmart` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trendmart`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: trendmart
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '49c7bd74-e6d4-11f0-85d0-58112282fe90:1-430';

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` double NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (30,25000,'Mobile Phone',3,NULL),(31,2000,'Headphones',2,NULL),(32,800,'Mouse',2,NULL),(33,5000,'Smart Watch',1,NULL),(34,75000,'Laptop',1,NULL),(45,25000,'Mobile Phone',5,11);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(500) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Electronic gadgets and devices','Electronics'),(3,'Home and office furniture','Furniture'),(4,'Play','Gaming');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` double DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt4dc2r9nbvbujrljv3e23iibt` (`order_id`),
  CONSTRAINT `FKt4dc2r9nbvbujrljv3e23iibt` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,70000,'Laptop',1,NULL),(2,5000,'Mouse',1,NULL),(3,100,'Charger',1,NULL),(4,70000,'Television',1,NULL),(5,75000,'Laptop',1,NULL),(6,25000,'Mobile Phone',1,NULL),(7,90000,'Mac Book',1,NULL),(8,75000,'Laptop',1,NULL),(9,2000,'Headphones',1,NULL),(10,5000,'Smart Watch',1,26),(11,1200,'Keyboard',1,26),(12,2000,'Headphones',10,27),(13,100,'Charger',1,27),(14,2000,'Headphones',1,28),(15,25000,'Mobile Phone',1,29),(16,100,'Charger',3,30),(17,25000,'Mobile Phone',1,31),(18,2000,'Headphones',1,31);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `address` varchar(1000) NOT NULL,
  `city` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `pincode` varchar(255) NOT NULL,
  `order_date` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `state` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'Yasmin','DELIVERED',75000,'','','','',NULL,NULL,''),(2,'Yasmin','DELIVERED',75000,'','','','',NULL,NULL,''),(3,'Yasmin','DELIVERED',75000,'','','','',NULL,NULL,''),(4,'Yasmin','DELIVERED',75000,'','','','',NULL,NULL,''),(5,'Yasmin','DELIVERED',75000,'','','','',NULL,NULL,''),(6,'Yasmin','PLACED',75000,'','','','',NULL,NULL,''),(7,'Yasmin','PLACED',0,'','','','',NULL,NULL,''),(8,'Yasmin','DELIVERED',75000,'','','','',NULL,NULL,''),(9,'Yasmin','DELIVERED',800,'','','','',NULL,NULL,''),(10,'Yasmin','DELIVERED',75800,'','','','',NULL,NULL,''),(11,'Yasmin','DELIVERED',75000,'','','','',NULL,NULL,''),(12,'Yasmin','DELIVERED',75000,'','','','',NULL,NULL,''),(13,'Yasmin','DELIVERED',82000,'','','','',NULL,NULL,''),(14,'Yasmin','PLACED',107000,'','','','',NULL,NULL,''),(15,'Yasmin','PLACED',2438000,'','','','',NULL,NULL,''),(16,'Siraz','PLACED',225000,'njxjax','hcbhbcj','8520828858','9874',NULL,NULL,''),(17,'Siraz','PLACED',225000,'njxjax','hcbhbcj','8520828858','9874',NULL,NULL,''),(18,'jncnbjf','PLACED',100000,'Renigunta, Tirupati, Andhra Pradesh, 517520, India','Renigunta','kvnnvvn f','517520',NULL,NULL,''),(19,'Deadpool','PLACED',102150,'Renigunta, Tirupati, Andhra Pradesh, 517520, India','Renigunta','874569123','517520',NULL,NULL,''),(20,'hameeda','PLACED',1200,'Renigunta, Tirupati, Andhra Pradesh, 517520, India','Renigunta','9014444151515415415414','517520',NULL,NULL,''),(21,'Siraz','PLACED',70100,'Apollouniversity','Chittoor','8520828858','517127',NULL,NULL,''),(22,'yasmin','DELIVERED',75000,'Renigunta, Tirupati, Andhra Pradesh, 517520, India','Renigunta','0000000000','517520','6/23/2026, 11:40:13 AM',NULL,''),(23,'hbh  hb','PLACED',25000,'Renigunta, Tirupati, Andhra Pradesh, 517520, India','Renigunta','jdbcjsdnjenksxn','517520','6/23/2026, 7:28:40 PM',NULL,''),(24,'yasmin','DELIVERED',165000,'Renigunta, Tirupati, Andhra Pradesh, 517520, India','Renigunta','9876543210','517520','6/24/2026, 8:12:44 PM',NULL,''),(25,'ab','DELIVERED',2000,'Renigunta, Tirupati, Andhra Pradesh, 517520, India','Renigunta','cd','517520','6/24/2026, 8:15:32 PM',8,''),(26,'Yasmin','DELIVERED',6200,'Renigunta, Tirupati, Andhra Pradesh, 517520, India','Renigunta','abcd','517520','6/25/2026, 5:36:16 PM',8,''),(27,'Pizza','DELIVERED',20100,'Renigunta','Renigunta','9856412301','517520','6/26/2026, 1:01:09 PM',9,'Andhra Pradesh'),(28,'Admin1','DELIVERED',2000,'Renigunta','Renigunta','9856412301','517520','6/26/2026, 1:01:38 PM',9,'Andhra Pradesh'),(29,'Admin1','DELIVERED',25000,'Renigunta','Renigunta','9856412301','517520','6/26/2026, 1:02:02 PM',9,'Andhra Pradesh'),(30,'Admin1','SHIPPED',300,'Renigunta','Renigunta','9856412301','517520','6/26/2026, 1:17:53 PM',9,'Andhra Pradesh'),(31,'account1','PENDING',27000,'Renigunta, Tirupati, Andhra Pradesh, 517520, India','Renigunta','987654321','517520','6/29/2026, 10:43:30 AM',8,'andhra pradesh');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_items`
--

DROP TABLE IF EXISTS `orders_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders_items` (
  `order_id` bigint NOT NULL,
  `items_id` bigint NOT NULL,
  UNIQUE KEY `UK7qrg5pfgjon82yhgwfqrdijm5` (`items_id`),
  KEY `FKij1wwgx6o198ubsx1oulpopem` (`order_id`),
  CONSTRAINT `FKij1wwgx6o198ubsx1oulpopem` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKl3w3fx5rbjq0tbb2i0xidwabh` FOREIGN KEY (`items_id`) REFERENCES `order_item` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_items`
--

LOCK TABLES `orders_items` WRITE;
/*!40000 ALTER TABLE `orders_items` DISABLE KEYS */;
INSERT INTO `orders_items` VALUES (5,1),(5,2),(21,3),(21,4),(22,5),(23,6),(24,7),(24,8),(25,9);
/*!40000 ALTER TABLE `orders_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `rating` double NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,'Electronics','Laptop',75000,'High-performance laptop suitable for programming, gaming, and professional work.','https://www.asus.dotcomstores.in/wp-content/uploads/2025/04/FX607VB-RL076WS-img.jpg',5,100),(3,'Electronics','Mobile Phone',25000,'Android smartphone with advanced features, excellent camera, and long battery life.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIgHgWOaI8rTYxGGVADKvhFjb391geG48cVXUrzaUusA&s=10',0,99),(4,'Accessories','Headphones',2000,'Wireless headphones with high-quality sound and comfortable design.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuAbxJg56uoWYQxMxXNM_CyOUQvcJ6YYok60flxyb_Sg&s=10',0,99),(5,'Wearables','Smart Watch',5000,'Smart fitness watch with heart rate monitoring and activity tracking.','https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw341c4c7c/images/Titan/Catalog/95416KP01K_1.jpg?sw=360&sh=360',0,100),(6,'Accessories','Keyboard',1200,'Durable mechanical keyboard designed for gaming and productivity.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PDWLKPYt5Byt2Mo2-89fko8EjVU8eqyaq6AMXx8lZA&s=10',0,100),(7,'Accessories','Mouse',800,'Wireless optical mouse with ergonomic design and smooth performance.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1w2AhxY5az7ug6kpx4TuvahtJtu1LOW73d-zypeRPiw&s=10',0,100),(8,'Electronics','Mac Book',90000,'High-performance laptop suitable for programming, gaming and professional work.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGG6xnP1AycqlLAgyJvTMH68SNA1xVfbLwDK8EUxYqyQ&s=10',0,100),(9,'Human','Basha',50,'Very Productive, intelligent,multi tasking but short tempered','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRe3IPoq8OP_jwvtR_Wc84iyCQlXXtHhqPZzlMLrxsw&s=10',0,100),(10,'Power','Charger',100,'Fast Fast Charge\n','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRci_6IL8nJNcK6vE8fYGgdgXCiRhehW_K0RAW0WIZTjQ&s=10',0,97),(11,' Gaming','Gaming Chair ',12000,'Ergonomic chair','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQmyhgFdpYPS7ZiWV-J_Js0-PRkbYRxC1jGfj1a8dsGA&s=10',0,100),(14,'Entertainment','Television',70000,'50 inch TV','https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1000',10,100),(16,'Summer Essential','AC',40000,'Thanda Thanda Cool Cool','https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS0XviUa4NJWrOajv4W9aCnAuTwwjyDqnKATtS79m-0mJLznc9DI1iZf-OC9y1A4nbIceSQviGQMlwhbLWCj1fgMZIvUrc8f2JFRvaOuJ6x3zURQPACyWKkyg&usqp=CAc',0,0),(17,'Gaming','test 1',753,'test image 1','http://localhost:8081/uploads/2b8b06c7-de88-4149-82c0-b72752d12af4_Screenshot 2026-01-28 125941.png',0,20);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(1000) DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'wow laptop',2,5,NULL,NULL),(2,'nnnnn',14,10,'account1',8);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'exotic@gmail.com','Exotic','$2a$10$C2nT7czRdIy4mt7tzTLByudON20UKtCwdveeNYjycvG8I5lBrw7Ya','CUSTOMER','4-56 Srinivasa Nagar','Renigunta','9876543210','517520','Andhra Pradesh'),(8,'account1@gmail.com','account1','$2a$10$.Z4nuty0.gb3UAsiYK4DQuUPi.VRY24f.KRv6lGp.paYulGWgvUJa','CUSTOMER','Renigunta, Tirupati, Andhra Pradesh, 517520, India','Renigunta','987654321','517520','andhra pradesh'),(9,'admin1@gmail.com','Admin1','$2a$10$97a1mXB6SlnXtLWfgHAhXusVNimIIwzD0J48w7RP1hsDlSkKpUnTa','ADMIN','Renigunta','Renigunta','9856412301','517520','Andhra Pradesh'),(11,'account2@gmail.com','Account-02','$2a$10$2EjGsQ1iVfthRuIrmX17heqaE9Qc3aZKNlrslBoaXBVOapR77S6Tq','CUSTOMER',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `price` double NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (9,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIgHgWOaI8rTYxGGVADKvhFjb391geG48cVXUrzaUusA&s=10',25000,'Mobile Phone',NULL),(10,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIgHgWOaI8rTYxGGVADKvhFjb391geG48cVXUrzaUusA&s=10',25000,'Mobile Phone',8);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-29 13:26:45
