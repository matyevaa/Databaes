# Gift Cards Website. Team Databaes
# Alima Matyeva & Nathan Shelby

Repository for CS 340 Database GiftCards Project, team Databaes, Summer 2020.

# Project Outline
Let’s make the last minute gift easier than ever. Instead of going to the store, buying gift cards and sending them out manually in the mail, we can just use Gift Cards Delivery for more convenience. The database will allow Senders to send from 1 to 1,000 digital gift cards to one or many different Recipients at the same time. Such a system would have something to offer for anyone, from small business to megacorporations.  
For instance, companies can use these to incentivize people, both externally and internally, acting as a reward for employees and as a marketing tool for potential customers. A database uniquely allows companies to organize and keep track of not only their Orders, but the information of their Recipients as well. It also will help prevent things like fraud and money laundering as it is, itself, a built in record keeper.

# Database Outline
Senders: the person placing the orders;<br/>
sender_emaill: varchar(20), PK,<br/>
senderID: int, auto_increment, unique, not NULL, <br/>
relationship: a 1:M relationship between Senders and OrderHistory is implemented with sender_email as a FK inside of OrderHistory.<br/>

Recipients: the person receiving a reward;<br/>
recipient_email: varchar(20), PK,<br/>
recipientID: int, auto_increment, unique, not NULL,<br/>
relationship: an 1:M relationship between Recipients and Orders is implemented with recipient_email as a FK inside of Orders. <br/>

GiftCards: a gift card sent from a sender to a recipient;<br/>
giftCardID: int(11), auto_increment, unique, not NULL, PK,<br/>
name: varchar(20), not NULL,<br/>
quantity: int(11),<br/>
relationship: an M:M relationship between GiftCards and Orders with giftCardID as FK inside of Orders.<br/>

Orders: the order placed that sends a gift card from the sender to the recipient;<br/>
trackerID: int(11), auto_increment, unique, not NULL, PK,<br/>
orderID: int(11), not NULL, FK,<br/>
giftCardID: int(11), not NULL, FK,<br/>
recipient_email: varchar(20), FK,<br/>
price: int(11), not NULL,<br/>
Relationships: an M-to-1 relationship with OrderHistory with orderID as FK in OrderHistory<br/>
Relationships: an M-to-M relationship with GiftCards with giftCardID as FK in Orders.<br/>

OrderHistory: A table to keep track of the gift cards associated with an order;<br/>
orderID: int(11), not NULL, auto_increment, unique, PK,<br/>
sender_email: varchar(20), FK,<br/>
quantity: int(11), not NULL,<br/>
Relationship: a 1-to-M relationship with Senders with sender_email as FK inside of OrderHistory.
