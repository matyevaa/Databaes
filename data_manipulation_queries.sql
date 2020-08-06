-- Databaes Team. Data Manipulation Queries.

-- *************************************************************************************************************
-- Select Queries
-- *************************************************************************************************************
-- “ : “ will denote externally input data for queries

-- Selecting total Order History table on page load

SELECT OrderHistory.orderID, orders.trackerID, OrderHistory.sender_email, orders.recipient_email, 
OrderHistory.quantity, GiftCards.name as name FROM OrderHistory 
LEFT JOIN senders ON OrderHistory.sender_email = senders.sender_email 
LEFT JOIN orders ON orders.orderID = OrderHistory.orderID 
LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID;

-- Selecting total Senders table on page load
SELECT (SELECT email FROM OrderHistory WHERE OrderHistory.orderID = orders.orderID), (SELECT  name FROM GiftCards WHERE orders.giftCardID = GiftCards.giftCardID), amount 
FROM orders;

-- Selecting total Recipients table on page load
SELECT orders.recipient_email, GiftCards.name, orders.price FROM orders 
LEFT JOIN recipients ON recipients.recipient_email = orders.recipient_email 
LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID 
LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID;

-- Selecting total GiftCards table on page load
SELECT name, quantity FROM GiftCards;

-- Selecting total Orders table on page load
SELECT OrderHistory.sender_email, orders.recipient_email, GiftCards.name, OrderHistory.quantity FROM orders 
LEFT JOIN GiftCards ON GiftCards.giftCardID = orders.giftCardID 
LEFT JOIN OrderHistory ON OrderHistory.orderID = orders.orderID;

-- Selecting searched for orderID
-- SELECT orderID, trackerID, (SELECT email FROM OrderHistory WHERE OrderHistory.orderID = orders.orderID), email, amount, (SELECT  name FROM GiftCards WHERE orders.giftCardID = GiftCards.giftCardID) FROM orders WHERE orders.orderID = :orderID;
-- Selecting searched for Senders
-- SELECT (SELECT email FROM OrderHistory WHERE OrderHistory.orderID = orders.orderID), (SELECT  name FROM GiftCards WHERE orders.giftCardID = GiftCards.giftCardID), amount 
-- FROM orders WHERE OrderHistory.email = :email;
-- Selecting searched for (recipient) email
-- SELECT email, (SELECT name FROM GiftCards WHERE orders.giftCardID = GiftCards.giftCardID), amount FROM orders WHERE orders.email = :email;
-- Selecting total GiftCards table on page load
-- SELECT name, quantity, price FROM GiftCards;
-- Selecting searched for GiftCards
-- SELECT name, quantity, price FROM GiftCards WHERE GiftCards.name = :name;

-- *************************************************************************************************************
-- Insert Queries
-- *************************************************************************************************************
-- Insert senders data into the senders table
INSERT IGNORE INTO `senders` (`sender_email`) VALUES (?);
INSERT IGNORE INTO `GiftCards` (`name`) VALUES (?);
INSERT IGNORE INTO `orders` (`price`) VALUES (?);

-- Insert recipients data into the recipients table
INSERT IGNORE INTO `senders` (`sender_email`) VALUES (?);
INSERT IGNORE INTO `GiftCards` (`name`) VALUES (?);
INSERT IGNORE INTO `orders` (`price`) VALUES (?);
INSERT IGNORE INTO `OrderHistory` (`orderID`) VALUES (?);

-- Insert giftcards data into the GiftCards table
INSERT INTO `GiftCards` (`name`, `quantity`) VALUES (?,?);

-- Insert orders data into the orders table
INSERT IGNORE INTO `senders` (`sender_email`) VALUES (?);
INSERT IGNORE INTO `recipients` (`recipient_email`) VALUES (?);
INSERT IGNORE INTO `orders` (`orderID`) VALUES (?);
INSERT IGNORE INTO `GiftCards` (`name`) VALUES (?);
INSERT IGNORE INTO `orders` (`price`) VALUES (?);

-- Insert OrderHistory data into the OrderHistory table
-- will work on that later...
-- INSERT INTO `OrderHistory` (`orderID`, `email`, `amount`) VALUES (:orderID, :email, :amount);

-- *************************************************************************************************************Delete Queries
-- Delete Queries
-- *************************************************************************************************************

-- Delete recipient from recipient table
DELETE FROM recipients WHERE recipientID = ?;

-- Delete sender from senders table
DELETE FROM senders WHERE senderID = ?;

-- Delete Gift Cards from GiftCard table
DELETE FROM GiftCards WHERE giftCardID = ?;

-- *************************************************************************************************************
-- Update Queries
-- *************************************************************************************************************

-- Update GiftCards table

UPDATE GiftCards SET name=?, quantity=? WHERE giftCardID=?;