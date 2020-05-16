---
title: Security and Cryptography I
---

# Useful Links

[Cryptography I Coursera](https://www.coursera.org/learn/crypto)

# Notes

What is security for you, define security

What is multilateral security, which are the parties involved, how are attackers involved in multilateral security

Imagine you are going to buy new laptop. With what operating system will you choose it to be?

Why is it reasonable to have 3 user accounts in a laptop only for you?

Explain the "s square-mod n-generator", how does it work, input, output, processes, everything.

Is it possible to omit the first step of squaring and simply take the last bit of s0 in both the symmetrical and the asymmetrical case, how is security affected in this case?

Why does the s quare mod n generator repeat the random bit sequence after a while

Because for the cycle to occur, the sequence of seed values only needs to hit one of the previous values

How should backups be done?

How do make a backup of a key for encryption

Why is asking for the key of a one time pad not any good?

List some protection goals.

Basic ones include confidentiality, integrity and availability. There are others like anonymity, accountability etc. It’s also nice to know at least some of the relations between them, e.g. anonymity and accountability kinda go against each other, availability implies integrity (you can’t have availability without integrity) etc.
Give definitions of the three basic ones.

Confidentiality: Only the authorized user can access the information
Integrity: The information is correct, complete and up-to-date.
Availability: The information is available when and where it is needed.
What are the properties of an attacker in an attacker model?

His time and money
His role in the system (outsider, user, operator, etc.)
His behavior
His area of physical control (which part of the system he can control)
What is the difference between a passive and an active attacker?

A passive attacker just listens, an active attacker takes action.
What is the difference between an observing and a modifying attacker?

The observing attacker does not break the rules, the modifying attacker does.
Where can the observing attacker break the rules like the modifying attacker?

In his own area of physical control.
What is the difference between symmetric and asymmetric cryptography?

Symmetric: one secret key
Asymmetric: a key pair of a public and a private key
What is the difference between encryption and authentication?

Encryption is used to protect the information; authentication is used to prevent unauthorized modification of the information.
Why is there no information-theoretic asymmetric system?

Because there is no mathematical construction to make it possible
Because the attacker has the public key, he could just try out every possible private key until he gets the right one
What is the definition of an information-theoretic secure system?

An attacker that sees the ciphertext gains NO information about the plaintext whatsoever.
An information-theoretic authentication system?

The MAC.
How does it work, i.e., in a communication diagram, who sends what to whom?

Just draw the diagram with the sender and the recipient (and, optionally, the KDC) from the slides

| key\plaintext, MAC | H,0 | H,1 | T,0 | T,1 |
| ------------------ | --- | --- | --- | --- |
| 00                 | H   | -   | T   | -   |
| 01                 | H   | -   | -   | T   |
| 10                 | -   | H   | T   | -   |
| 11                 | -   | H   | -   | T   |

Explain the MAC table.

The table is used to authenticate the plaintext message bit by bit. For one plaintext bit, you need two key bits. {H,0;H,1;T,0;T,1} are the possible plaintext-MAC code pairs that can be observed by the attacker, {00;01;10;11} are the key bits.
Example: The attacker sees the plaintext H and MAC 0 (H,0 – the first column). He wants to manipulate the message; more precisely, he wants to change the plaintext to T. He knows the plaintext was H and the MAC was 0, so he looks at the table and sees the key could have been 00 or 01. Now, if the key had been 00, the corresponding MAC code for the changed plaintext would have to be 0, but, if the key had been 01, the corresponding MAC code would need to be 1. He has no idea about the correct MAC code being 0 or 1 -> that’s also why MACs are information-theoretic secure.
What if someone does this?

| key\plaintext, MAC | H,0 | H,1 | T,0 | T,1 |
| ------------------ | --- | --- | --- | --- |
| 00                 | H   | -   | -   | T   |
| 01                 | H   | -   | -   | T   |
| 10                 | -   | H   | T   | -   |
| 11                 | -   | H   | -   | T   |

Then it’s broken.

How to fix it again?

| key\plaintext, MAC | H,0 | H,1 | T,0 | T,1 |
| ------------------ | --- | --- | --- | --- |
| 00                 | H   | -   | -   | T   |
| 01                 | H   | -   | T   | -   |
| 10                 | -   | H   | T   | -   |
| 11                 | -   | H   | -   | T   |

what are possible attacks on block ciphers

Exhaustive search attack: search all possible keys
Side channel attack: monitor time or power consumption to recover key
Faults attack: cache misses or fault computations reveal the key
Linearity attack: any tiny linearity in the relation between c and m will reveal the key
Quantum attacks: exhaustive search possible in 2 to the power of number of keys to the 0.5
Deterministic encryption can not be semantically secure under a CPA

# Exam Suggestion

Honesty is appreciated. Saying "I don't know" is much better than pretending to know and being completely off.
Choose a favorite topic, it shows you were interested in at least one topic and gives you the opportunity to spend test time on something you really know.
Don't be nervous(take deep breaths)expect the teacher to be nice and fair during the exam
Feel free to defend your opinion even if he gives you arguments against. He respects people who can give good reasons for what they said!
