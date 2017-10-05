## RING-Network

Receiver anonymity: cause every station receive the message at least one time.

Sender anonymity: every station sends at least with the summed up rate of its actual sending rate.

### N-anonymous

There is no situation where an attacker encircling n consecutive stations with any desired amount of attacking stations can identify one station as a sender or a receiver.

如果有N个**连续**的Station被攻击者环绕，但是无法得知谁是发送送者或者接收者。

### Prove 2-anonymous ring-network

If attackers encircled 2 stations, the message passed thought two stations is digital generated, and after digital regeneration messages is not related to original message. So for the attackers they didn't know which one of station 1 or station 2 is sender or receiver. For each information unit there is at least one alternative, on that station 1,2 sends the information unit. 


### Fault tolerance of the RING-network

#### Braided Ring

It has two path. Outer ring path: stations connect one by one, inner ring path: stations connect to second next neighbor station. 

More details on note.