-- Team Databaes. Data Definition Queries.

-- Table structure for table `senders`

DROP TABLE IF EXISTS `senders`;
CREATE TABLE `senders` (
`senderID` INT(11) NOT NULL AUTO_INCREMENT,
`sender_email` varchar(255) primary key,
 UNIQUE(senderID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Table structure for table `recipients`

DROP TABLE IF EXISTS `recipients`;
CREATE TABLE `recipients` (
`recipientID` INT(11) NOT NULL AUTO_INCREMENT,
`recipient_email` varchar(255),
CONSTRAINT recipients_pk_1 PRIMARY KEY (`recipient_email`),
 UNIQUE(recipientID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Table structure for table `GiftCards`

DROP TABLE IF EXISTS `GiftCards`;
CREATE TABLE `GiftCards` (
`giftCardID` INT(11) primary key NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`quantity` int(11),
 UNIQUE(giftCardID)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `OrderHistory`;
CREATE TABLE `OrderHistory`(
	`orderID` int(11) primary key NOT NULL AUTO_INCREMENT,
	`sender_email` varchar(255),
    `quantity` int(11) NOT NULL,
	CONSTRAINT OrderHistory_fk_1 FOREIGN KEY OrderHistory(`sender_email`) REFERENCES senders(`sender_email`),
	UNIQUE(`orderID`)
)Engine=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`(
	`trackerID` int(11) primary key NOT NULL AUTO_INCREMENT,
	`orderID` int(11) NOT NULL,
    `recipient_email` varchar(255),
	`giftCardID` int(11) NOT NULL,
	`price` int(11) NOT NULL,
	CONSTRAINT Orders_fk_1 FOREIGN KEY orders(`orderID`) REFERENCES OrderHistory(`orderID`),
	CONSTRAINT Orders_fk_2 FOREIGN KEY orders(`giftCardID`) REFERENCES GiftCards(`giftCardID`),
	CONSTRAINT Orders_fk_3 FOREIGN KEY orders(`recipient_email`) REFERENCES recipients(`recipient_email`),
	UNIQUE(`trackerID`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


--*******************
--INSERT SAMPLE DATA.
--*******************

INSERT INTO `senders` (`senderID`, `sender_email`) VALUES
(1, "sender1@gmail.com"),
(2, "sender2@gmail.com"),
(3, "sender3@gmail.com"),
(4, NULL);

INSERT INTO `recipients` (`recipientID`, `recipient_email`) VALUES
(1, "recipient1@gmail.com"),
(2, "recipient2@gmail.com"),
(3, "recipient3@gmail.com"),
(4, NULL);

INSERT INTO `GiftCards` (`giftCardID`, `name`,`quantity`) VALUES
(1, "Amazon", 150),
(2, "Starbucks", 300),
(3, "Target", 400);

INSERT INTO `OrderHistory` (`orderID`, `sender_email`, `quantity`) VALUES
(012345, "sender1@gmail.com", 30),
(012346, "sender2@gmail.com", 50),
(012347, "sender3@gmail.com", 100);

INSERT INTO `orders` (`trackerID`, `orderID`, `recipient_email`, `giftCardID`, `price`) VALUES 
(1, 012345, "recipient1@gmail.com", 1, 30);

INSERT INTO `orders` (`trackerID`, `orderID`, `recipient_email`, `giftCardID`, `price`) VALUES 
(2, 012346, "recipient2@gmail.com", 3, 20);

INSERT INTO `orders` (`trackerID`, `orderID`, `recipient_email`, `giftCardID`, `price`) VALUES 
(3, 012347, "recipient3@gmail.com", 2, 10);
