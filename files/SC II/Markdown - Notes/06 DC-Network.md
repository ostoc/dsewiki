## DC-Network
### Basics
Protection of **sender**

Side note: Query & Superpose uses the same idea, but it protects receiver's anonymity.

**Anonymity of the sender:** If stations are connected by keys the value of which is completely unknown to the attacker, tapping all lines does not give him any information about the sender. 

### Superposed Sending

1. Exchange the key between the stations in security channel.
2. Message character adds keys create by self, subtract keys create by communication parter, other station could local sum 0 with keys.
3. To get the real message, global sum all messages from different stations.

For station i and j, the key pair follow K(i-j) = - K(i-j)


**The idea is, when sum up all messages, all key should be counteract each other**

*For binary superposed sending, the key between two station is the same.* (For addition mod of number of alphabet, e.g. `mod 16: 4 + E (14) = 18 mod 16 = 2`)

### Reservation scheme

Station choose **randomly** the time frame he wants, send it to the dc-server, observation the message replied. if the sum of each bit is not greater than 1, means there is not collision, the message can be send in that time frame. 

### Superposed receiving
#### Pairwise superposed receiving
Setup: 2 station receiving the message. **Without pairwise:** 2 stations have to wait all the message arrived then calculate the global sum. **With pairwise:** when 2rd station got the global sum, they can subtract their own message to get another message.

#### Global superposed receiving
In the global superposed receiving, all member stations **store** the unusable message after a superposition-collision. Only n−1 message need to be re-sent: the last message can be gained by subtraction of the n−1 messages form the unusable message.
#### Global superposed receiving with average algorithm
More details: A.2
### Prove of sender anonymous
More details: A.3
### Fault tolerance and attacks
#### DC+ Net
Basic idea: if broadcast error then uniformly distributed modification of keys. Keys depend on global sums from previous rounds. If only one station receives a corrupted message in one round, its global sum will be corrupted too, meaning that in the next round, its keys will be corrupted, and as a result, it will broadcast a corrupt local output and the global sum will be garbage. Availability is violated, but anonymity is not!

### Attack model
Attacker can disturb the DC-Network by sending meanness messages. The global sum will be corrupted, and other stations cannot transmit correct information.
**Solution:** Reserve Blobs with Trap

#### Reserve Blobs with Trap

1. Each station has to set one randomly bit (we call it bit index) to 1, the selected position will be the order to send message.
2. Encrypt bit index and random message
3. Based on reserve order, send the encrypted random message

If an attacker damaged the random message (check the global sum) will reveal the encrypted reservation blobs. And participants can know who is the cheater and discard the shared keys with them. 

More details: A.4 