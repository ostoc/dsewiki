## MIX-Network

### Basic Idea
Multiple times encrypted message send to MIX. Each MIX decrypt one of the encryption (like onion layer), then reorder (shuffle) MIX all messages. Send message to next MIX do the same procedure. 

Provide unlink-ability: the attacker cannot tell which income message is outcome message. But each MIX knows the incoming message and out message. 

Aim: Protection of communication relation: all other senders and receivers of messages that were MIXed together in the batches of the MIX or all MIX that were processed by one message **have to work together** in order to reveal the communication relations against the will of the sender and receiver.

**Compare to DC-Network**

1. More efficient. In DC-Network, if only one station wants to send message, all other station also has to send message. 
2. Less overhead. 

### Deeper in MIX

#### Discard Repeats
An attacker could copy a message he has gotten from user before and send copies tot the Mix. These messages would take the same way though the network, cause the return address and description are the same. Attacker can track these information and find the relation between sender and receiver. 
**Solution:** add timestamp to each message comes into Mix. Within certain interval, the same message will be discard. 

#### Buffer Messages
* Batch buffer: wait until certain mount of messages and then flush the message. **Con:** if there are not enough message, the wait time will be very long; **solution**: add dummy messages or set a unbound.
* Pad Buffer: if new message comes, randomly select certain message. **Pro:** faster; **Con:** you wont know how long the message store in the pool, can't use in low latency system.

#### Cascade or Mix Network
- Mix Network: user freely choose the Mixes
- Cascade: user choose a specific chain of Mixes.
In a Mix network, the user decide which Mixes he wants to use. This approach provides good scalability and flexibility. Also, the chosen Mixes are totally random, so attackers cannot observer more efficiently. On the other hand, when user choose the Mixes freely, it increase the possibility of choosing unsafe mixes.

For Cascade, it is vulnerable to denial of service. If one of the Mix failed, the service won’t work any more. Compare with the possibility of choosing unsure Mixes, cascade maybe a better choice.  

#### Key distribute mechanism

Never decryption directly after encryption, e.g. MIX 1 encrypt the message and send to MIX 2, MIX 2 decrypt the message and encrypt by himself. Both MIXes can reveal the communication relations. 

First MIX may know the sender, last MIX knows the receiver, so it can use symmetric encryption. Asymmetric encryption systems must be used for “middle” MIX’s.
 
**Why asymmetric encryption for middle MIX?**

The messages ware encrypted by the sender before it send to the MIX, so the keys for further MIX and determined by the sender at the beginning, if use the symmetric encryption system. Further MIXes know sender information by the symmetric keys.

#### Change order
An appropriate order would be the alphabetical order of the encoded messages. 

**Why don't use random? **
1. faster, more efficient 
2. Give no chance to MIX to produce a Trojan Horse, cause the order time is very short. 

#### Maximal protection

All messages of same length in the considered time interval have to pass the MIX’s at the same time. 

If one message of batch is left over by others, attacker can differ this message from others. 

#### Mix Channel

### Anonymity scheme

#### Sender Anonymity
n: number of MIX; M: Message; C: Asymmetric Encryption; Z: Random number [^1]; A: Address of MIX; K: Symmetric key; n+1 is receiver; 0 is sender; e: return address of receiver

**Direct**

	Mn+1 = Cn+1(M0)
	Mi = Ci(Zi, Ai+1, Mi+1)

**In-direct**

	Mn+1 = Cn+1(M0)
	Mi = Ci(Ki,Ai+1); Ki(Mi+1)

#### Receiver Anonymity

	// For header is decryption in each step
	Hn+1 = e 
	Hj = Cj(Kj, Aj+1, Hj+1)
	// For conten is encryption in each step
	Ij = Kj-1(Ij-1)
	// Recipent will decrypt the message locally with corrosponding key


#### Mutual Anonymity

Sender chooses K1 - Ks; Receiver choose Ks - Kn; The real return address: e, set n = 5, H = header, B = body, b real body
	//for header
	H5 = C5(K5, e)
	H4 = C4(K4, A5, H5)
	Hs = Cs(Ks, A4, H4) 
	// Sender get Hs, decrypt with Ds
	// get H4 encrypt with C3 C2 C1
	H3 = C3(K3, A4, H4)
	H2 = C2(K2, A3, H3) subsituide
	H1 = C1(k1, A1, H2)
MIX decrypts one by one find the final address
	//for body, message on link
	B1 = K1(K2(K3(Ks(b)))
	B2 = K2(K1(b))
	B3 = K3(Ks(b))
	B4 = Ks(b)
	B5 = K4(B4)
	B6 = K5(B5)

#### Return Address
It’s the address of recipient. 
#### Maintaining message length
- If the input message’s length is different from the output message, it will decrease the anonymous of the system. Because attacker can compare to message’s length and distinguish different messages.

- In order to keep the output message has the same length, we need to add some random data in the message. 
	- One can choose add the data between Header and Message, but the MIX has to know where is the HEAD section and Message section. Cause HEAD is always decrypt. 
	- or at the end of the message. If the encryption algorithm satisfied K-1(K(M)) = K(K-1(M)) = M. Then the Mix doesn’t need to differ which part should be use encrypt or decrypt. 

- Implementation of MIXes using RSA without redundancy predicate and with contiguous bit strings is insecure. 
More details check the note.

### Fault Tolerance of MIX

* Simple: sender has alternative disjoint MIX-network 
* Better one: use candidate MIX, if one MIX down in the network, can choose another candidate. But it will decrease the anonymity, and sender has to increase the trust number of mix. 
 **Solution:** coordination only between neighbor MIXes.

### Attack model
1. Power attacker observes the all Mix network;
2. Denial of service
 3. N-1 Attack: A batch has N messages, and attacker control N-1 messages. Obviously the attacker can know the information of that message. **Solution:** add interval for sender and receiver. at least some times the attacker cannot send the message, then control the message flow. 


[^1]:	Why we need Z? Due to the public key is known by everyone. We need the random number to prevent attacker guess the plain text by compare the encrypted message.