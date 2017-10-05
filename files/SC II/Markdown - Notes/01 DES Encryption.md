## DES
### Basic
Block size: 64bit 
Divid into two block, left and right, each of them has 32 bit. 
Key size is: 64bit, only 56bit in use, other 8bits for examination.
S-Box: input is 6bit and output is 4bit.
Permutation-Box: Duplicate or reorder the bits.
### Encryption Algorithm
	Li+1 = Ri
	Ri+1 = f(Ri,Ki)+Li
### Decryption Algorithm
When decrypt, need change the order of left and right.
	Ri = Li+1
	Li = f(Li+1,Ki)+Ri+1 
	   = f(Ri,Ki)+f(Ri,Ki)+Li
## Steam Cipher
- **Synchronous steam cipher**: In a synchronous stream cipher a stream of pseudo-random digits is generated independently of the plaintext and cipher text messages, and then combined with the plaintext (to encrypt) or the cipher text (to decrypt). **E.g. 1 time pad**
- **Self-synchronizing stream ciphers**: uses several of the previous N cipher text digits to compute the key stream. **E.g. CFB**
## Block Encryption
### Electronic Codebook
Con: same plain text got the same cipher text. 
### CBC - Cipher Block Chain
	C0 = Ek(M0 + IV);
	C1 = Ek(M1 + C0);
	Ci = Ek(Mi + Ci-1)

**CBC as Authenticator**
Use the last block as MAC.
### CFB - Cipher Feedback[^1]
	Xi = Xi-1[S:]
	Ci = Ek(Xi)[:S]+Mi
	(SHIFT-REPLACE)-ENC-(SELECT-ADD)-SELECT (SRESAS)
**Collision-Resistant Hash Function**
Use CFB as hash function then use the last block as hash output.

## Diffie-Hellman Key Distribution
- based on difficulty to calculate **discrete logarithms **
	g^(q\*k) mod p
	= g^(k\*q) mod p



[^1]:	XOR the message with Encryption