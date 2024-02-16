CREATE DATABASE IF NOT EXISTS 'todo-task-db';

USE 'todo-task-db';

DROP TABLE IF EXISTS `taskLists`;

CREATE TABLE `taskLists` (
  `taskID` int NOT NULL AUTO_INCREMENT,
  `taskName` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `isTaskCompleted` boolean COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`taskID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
