## Broadcasting
Guarantees perfect information-theoretical unobservalility of **receiver** and unlinkability. 

### Implicit addressing

When Station want to send specified information to **certain** recipients, will use implicit addressing. 

Implicit address doesn't have any linkability to the real physical location of recipient. *attacker cannot find the information of recipient based on the implicit addressing*

For example, station (S) want to send message to recipient to (R), and the implicit address (IA) of R is based on a random number (10101001). **S** will broadcast message with **IA**, other recipient will compare the IA with their IA. If it is not for them they will ignore it. *(also a usual way to implement visible implicit address)*

 
**Visible Implicit Address**: if an implicit address is visible to anyone, no encryption. E.g. using random numbers.

**Invisible Implicit Address**: if an implicit invisible is invisible (encrypted, only the right recipient can decrypt it)

### Address Distribution

**Public Address**: Address is publicly known. E.g. yellow book, it is only for the first time contact.

**Private Address**: assigned to single communication partners

### Implementation of invisible implicit address

The usual implementation of invisible implicit addressing employs redundancy within the message content and **an asymmetric encryption system**. 

`E.g. Enc(|implicit addr.|message content|)`

Every message is encrypted completely or partially with the encryption key of the addressed participant (key distribution: the first option is an end-to-end encryption). 

After the decryption with the corresponding key the user station of the participant addressed can determine (with the redundancy inside the message, think this part is implicit address) whether the message was designated for him. 

**Symmetric Authentication:**  messages are authenticated symmetrically. So the MAC is the appended redundancy. The potential addressees check if the message was authenticated correctly from their point of view.[^1]

### Fault tolerance on broadcast
Recipients that receive error prone information units or do not receive them at all should insist on a repeated but error free transmission (even if they have no need of the information) unless the reaction could reveal the recipient.

[^1]:	Invisible Public Address can use asymmetric encryption; Invisible Private Address can use symmetric encryption.