## Query and Superpose

### Basics

For broadcast: when station wants to send certain data to specific recipient, it has to broadcast the certain data to all recipients with specific recipient’s address. 

But with **query and superpose**, the participants can query the messages superposed from the **servers**. Others are not able to find out which information was queried. That is because the superposed messages are superposed locally what produces the final message.

**Goal:** protecting the receiver.

### Process

**Prerequisite:** given system has 5 servers and each server which can contain 4 messages (and stores the same messages in same order).

**Presume:** we decide to query message from 3 (it can be any number between 1-5) different servers.

**Steps**
Step 1. Generate **2 random request** index messages, and the 3rd one is generate with **Expected Index Message**(e.g. want request message 2) XOR with other **2 random queries**;

	req.1: 1001 random 
	req.2: 1011 random
	req.0: 0100 want request message 2 
	XOR 
	req.3: 0110 

Step 2. Send request to 3 random server, because the server has the same sequence of messages;

	// example message on server
	msg.1: 1010
	msg.2: 1101
	msg.3: 1001
	msg.4: 0101

Step 3. Server XOR requested messages, and send back;

	res1: 1010 xor 0101 = 1111
	res2: 1010 xor 1001 xor 0101 = 0110
	res3: 1101 xor 1001 = 0100

Step 4.Recipient XOR all received message.

	1111 xor 0110 xor 0100 
	= 1101 (msg.2)

**Optimization**
1. Sending a Pseudo-Random Bit Generation (PRBG) seed instead of the random vectors (can generate the random index message more efficient).
2. Using padding keys and a local master to do the superposing (If attacker get all the information from step 3 to step 4, he can also do the sum, and he will get the information).

### Invisible implicit addresses using Query and Superpose
If a message is intent for only certain participant, so the offset(or index of that message should not be know by other participants). So we can use invisible implicit address for that index. 

### Fault tolerance and attack mode

In order to handle the intentionally behavior on server side, such as not respond to the request or delivers wrong response, the recipients can do:

1. If the server doesn’t reply, the client can send the same request to other servers (selected random)
2. The message sends from server should be authenticated by the server. Cause clients can send the same request to different servers (do this step twice). The client side local sum will be different if some server cheated.