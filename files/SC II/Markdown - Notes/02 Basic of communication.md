## Basic of Communication
### Protection Goals
#### Confidentiality
1. The content of message should be confidential, and cannot been seen by others
2. Sender & recipient information should be secret
3. Current location of sender/recipient should be confidential (for mobile purpose)
**Solution:** End-to-end encryption. Sender encrypted the data and send, receiver decrypt the message. 

#### Integrity
1. change of the message should be observe
2. sender can prove himself sends the correct message
3. recipient has to prove where the message from
**Solution:** Authentication

#### Availability
Allow all participant to send the message
**Solution:** divisive network 

#### Unobservability\* 
Ensures that a user can use a resource or service without others being able to observe that the resource or service is being used. Parties not involved in the communication can observe neither the sending nor the receiving of messages.
#### Anonymity\*
Ensures that a user can use a resource or service without disclosing his identify. Not even the communicants can discover the identity of messages.

### Observability

#### Prevent observing Traffic data
**Link-to-link encryption:** it provides protection of connection between two neighboring station. Attacker cannot get any information of traffic data. He won't know what has been transferred though the networking and who send to whom. 

However for powerful attacker, he can attack the exchange stations. Because the data at station are not encrypted, so attacker can get **Content Data** he wants. 

Besides, as the networking developing, encrypt all the data thought the network and decrypt them at station is impossible.

#### Prevent observing Content data
**End-to-end encryption**: send encrypted the data and send the data to the recipient, recipient will decrypt the data. Attacker cannot get the **content data** but he still can get the traffic data. Even though he doesn't know what is inside the message, but he knows this message sends from whom to who.

#### Prevent observing Content data and Traffic data
Use end-to-end and link-to-link together.

### Protection measures outside the communication network

#### Public node
The sender and receiver addresses become meaningless if various public nodes are used. 

E.g. Public phone station

#### Time independent

The time when a message is in a communication network becomes almost meaningless if a network node would request information not when the user wants it but **at some randomly chosen point of time** before the request

#### Local choice (Preference choice)

To protect selection data you can request information in larger chunks and pick the information that you are interested in later

E.g. If a reader orders multiple newspapers of different political directions instead of a specific article, then no one could imply the political interests and opinions of the reader.

### Unlinkability, Unobservability, Anonymity

For an event E, if the possibility of occurrence of E is equal before and after every observation O. `P(E) = P(E|O)` [^1] For attacker A: 0\< P(E|O) \< 1 if P(E|O) = 1, then every event happens, attacher observed the event.

Unobservability of events can be viewed as unlinkability of observations and the events behind them.

Anonymity can be viewed as unlinkability between instances and events.

[^1]:	事件 E 发生的频率等于 O 和 E 同时发生的频率