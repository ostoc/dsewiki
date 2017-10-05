## Electrical Banking

### Security priorities of digital payment systems

Integrity: can prove transfer the money to the third party; 
Availability: user can chose have or lose the right to transfer the money; 

The users cannot increment their rights even if they collaborate.

Paper based payment: cannot make perfectly copy, but in digital payment the money (right) can be copied perfectly. 

Solution: witness accepts only the first (copy of a) message.  Ex: Bitcoin, user sends the same coins to others, they system can detect the error and only the one party can get the coin.

Also should concern about the anonymity and privacy.  

### Pseudonyms

Person pseudonyms: 
* public: phone number; 
* non-public: account number, cannot be access publicly may the bank can know this information; 
* anonymous: DNA as long as no register, sometime the owner of pseudonyms don’t know the information of his pseudonyms; drawback: some of them are not easy to change
* Role pseudonyms: enter into a role you have this role, however enter in another role will change the role (more anyone than personal pseudonyms).
* Business-relationship(e.g. Bank Account name);
* Transaction: e.g. transaction on Alipay, only use once, only for transaction won’t appear again.

Likability of pseudonyms with context:
in different role uses different pseudonyms, e.g. student won’t use their ID number in a hospital. p119 red text are example

P120: Recipient can check the documents are signed by the person’s pseudonyms. Test key is pseudonyms. Test key is public, and better to be a pseudonyms, and that used by the person. The person generates this pseudonyms by themselves. 

### De-anonymized Pseudonyms:
 
Trusted third party knows you real identity. Sender send the document signed by the sender and plus the signature signed by the trusted third party. (is part of German law)

Pro. Communication parties don’t know each others identity. 
Con. You have to trust the trusted third party you have chosen. The trust party will not reveal you identity, secondly you have to trust the integrity of another trust third party. 

Reduce the knowledge of trust party - using distributed trusted third party.

use a chain of TTP(trust third party), when send document, have to plus all the certificated created by the TTP (if the TTP want reveal your identity, they have to work together)

### Security for completely anonymous business partners

Customer place the order send to TTP, Merchant get the order and then send the products to the TTP, and TTP will check the products and send to customer. TTP send the money to Merchant. avoid Merchant send to the customer, cause it will break the anonymity, if the customer said the he didn’t get the products or the products wrong ( all the problem can be solved by checking by TTP)

### One time convertible authentication
After participant got the money, he needs change the pseudonyms to another one to prevent a linkability for further transaction. 

P: pseudonyms, H(P): hash function of pseudonyms, S: private key of bank, T: test key of bank, r: random number is chosen by recipient.
1. recipient create pseudonyms as: (P,H(P))\*r
2. Bank sign it with S(T(P,H(P))\*r)
3. recipient use RSA property transfer it to S(P,H(P))

### Offline payment system

Sbank(C(r1),C(r1+I),....,C(rn+I))
C: commitment
Recipient decides, whether he wants to get revealed ri or ri+I.

If it is double spent, the identity of double spender can be reveal (There must have a chance that get ri and ri+I at the same time.)




