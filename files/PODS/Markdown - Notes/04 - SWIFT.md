## SoftWare Implemented Fault Tolerance
### Using memory errors to attack JVM
**JavaVM type checking mechanism**
1. Translate to byte code 
2. Byte code verifier guarantee safety of the program
3. Untrusted code and trusted code store run in the same address space. When untrusted code system call via API.

**Goal** 
To obtain two pointers of incompatible types that point to the same location, then execute an function to reads and writes arbitrary memory location, hence executes arbitrary code. 

**Fault Mode**
Outside hardware cause the bit flip happens, the pointer will change. Then we can have two pointer in two different object point to the same object. 

**Why we can use this kind of attack in JAVA VM?**
Because JAVA uses link-time type-checking instead of run-time checking. Java translates the program to byte code and store them with trusted code. JAVA VM only check the program at Link-time, not the run time to improve the performance. But run time program can be changed by hardware method. 

**Attack Code**
We assume we have equal pointers `p` and `q` of types A and B,
	A p;
	B q;
	int offset = 6 * 4;
	void write(int address, int value) { 
	    p.i = address - offset ; (1)
	    q.a6.i = value ;(2)
	}
(1) writes `address - offset` at the field q.a6 [^1]. (2) writes value at an **offset** of **offset** from q.a6. Thus the procedure writes value at `offset + (address - offset) = address`.


### Input/Output Via System
In order to make the program runs correctly, we need check the **arguments** passed to a system call.

**Solution:** end-to-end checksums

### Control flow checking
To make sure all program branches are executed correctly.
Comparing a run-time signature with a pre-computed signature.

#### Control flow error\*
Deviation from the program’s correct instruction flow execution:
1. Branch-error: error in branch instruction, program doesn’t execute as expected branch.
2. IP error: error in Instruction Pointer.[^2]

#### Type of control flow error  

A-E can be detected by using CFE with signature. F can be easily detected and protected by (hardware) memory access protection mechanisms. 

#### Solution for CFE with Signature\* 
D1: enter calculate constant
D2: exit calculate constant
S: unique Signature in program (Random)

	S = S xor D1
	if (S! = 1001) 
	// 1001 is unique signature
	about(); 
	S = S xor D2

**Node X (xor) Type: if more than one predecessor node, then all predecessors have exactly one successor node**
	Entry: S = S xor D1
	Exit:  S = S xor D2

**Node A (and) Type: more than one predecessor and one predecessor has at least two successors**
	Entry: S = S and D1
	Exit:  S = S xor D2 
Note: Cannot detect Class C, jump to the beginning and Class A if it has multiple successors.
#### Assumption Coverage
- Failure assumption: defines how a component can fail 
- Assumption Coverage: Probability that the failure assumption is true in case a failure has occurred. 
- Implication: if the fail-stop failure is high. For example, 99% of the system failure is fail-stop failure, and 1% is unconstrained failure. Then we only need F+1 instead of 3F=1 components to deal the fault tolerance, and still provide better availability. 
### Data flow checking
Make sure the correct values are computed. Data-flow checking rely on **redundancy**.
#### Fault Mode
- Operator error: `a=x+y -> a=x-y`
- Modified operand error: `a= x+4 -> a=x+5`
- Wrong operand error: `a=b[5]+1 -> a=b[4]+1`
- Operation error: `a=x+y -> a=x+y+4`
- Lost updates: `a=x+y -> b=x+y`
#### Sphere of Protection
- Instruction stream level: checker cpu 
- Machine level: redundancy to binary code 
- Assembly code level: redundancy to assembly code
- Source code level: redundancy to source code
*Higher abstract level covers lower level’s fault and failure.*
#### Time Redundancy
Execute the code multiple **times**.
##### SWIFT
SWIFT is a compiler-based transformation which duplicates the instructions in a program and inserts comparison instructions at **strategic points**. 

Advantage: Don’t need external hardware to support; can adapted to vary transient fault policy; efficient; 

**Duplicate Instruction**

Each duplication of the program uses different registers and different memory locations(prevent interfere).

At certain **synchronization points** in the combined program to make sure that the original instructions and their redundant copies agree on the computed values.

**Synchronization Points**
- Store function: since we define the correctness by the output of program, `store` maps the output to the memory, so if the `store` values are correct, we consider that the program executed correctly.
- Branch instructions: `branches` can cause store to be skipped, incorrect stores to be executed, or  incorrect values to ultimately feed a store.

**Window of Vulnerability**
Two primary points-of-failure:
1. there can be a delay between **validation** and **use** of the validated register values, any strikes during this gap might corrupt state. 
2. if an instruction opcode is changed from a non-store instruction to a store instruction by a transient fault. These stores are unprotected because it happens after the compiler translated the code.

**Conquer WoV with SWIFT-R**
Approach: use extra copy to permit recovery from errors.[^3]
1. Triplicate loaded values and operations
2. Use **majority** mechanism to load values or store
##### Replicator
Replicate memory and instructions, same as NonStop, instead on different hardware, execute them on same hardware.
**Check point**
- In-going wrapper: un-replicated code wants to call replicated code; replicate the arguments and call the replicated code. 
- Out-going wrapper: replicated code wants to call un-replicated code; compare replicated arguments, iff they are the same call the un-replicated code. 
#### Space Redundancy
Execute on multiple hardware (E.g. HP NonStop Mainframe).
**Con:** Using hardware fault tolerant mechanisms is too expensive for many processor markets. And these mechanisms will not differ the low critical and high critical subsystem. The will deal the problem in a same level. 

#### Information Redundancy
Encode information, add extra information to detect the error of data.


##### Encode processing
Each output assigned a unique random signature. Compare the output’s signature with pre-set signature, if it is not the same fail-stop the program. 
**Signature has N bits, detected number of failure will be 2^N, and undetected will be 2^(-N); increase the N, improve the assumption coverage.** 
##### Arithmetic Codes
Detect hardware design failures and compiler failures.
- AN Code
- AN+B Code
- AN+B+D Code
- Signature Computations: calculate the right result ahead,if the program is wrong can compare the sign 

##### ParExC
- One thread runs the original program as speculator. It pre-calculates the Signatur
- Periodically take a snapshot, runs encode program on other threads.
- After certain point, check the results and Signature to prove the speculator is right.

**Speculative System Calls**
The Encode program on other threads may execute some instruction before the original program, cause the replay out of order. So we need a synch mechanism to solve this problem. 

Using the kernel extended module, when uninstrumented codes execute system calls, it will speculatively execute. After the Encode program sync with them, it will actually executed in kernel. 

**Speculative Variables**
Out-of-bounds checker keeps track of allocations: 
* Tracking only in checking variant
* Parallelization may break causality 

[^1]:	p.i = q.a6

[^2]:	This kind of error is not easy to detect by CFC, but can be detect by DFC.

[^3]:	Similar as TMR