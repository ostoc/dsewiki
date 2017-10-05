## Commercial System
### Fundmental Knowledge
#### Availability Requirements
- Continuous availability: the system will operation 24/7, won’t stop
- High availability: the system will available for 100% **during operation** it has scheduled downtime
- Basic availability: short interrupt is ok, apply to most of the apps

#### MTTF/MTTR
- MTTF = mean time to failure
- MTTR = mean time to repair 
- Availability = MTTF/(MTTF+MTTR)
- Unavailability = MTTR/(MTTF+MTTR) ≈ MTTR/MTTF

#### Scheduled/Unscheduled Outage
- Unscheduled: are unanticipated failures in any part of the technology infrastructure that supports the application.
- Scheduled: are routine interruptions planned  in advance for routine maintenance or inspection of equipment.

#### Soft error
Soft error(a.k.a transits error) caused by bit-flip. It can be detected and repair by the system. 
Solution: 
- Avoid soft error by using better material and change the mounting of RAM chips. 
- Detection and Correction:
	- Parity
	- ECC Hamming Code (7,4)
	- Memory Scrubbing
#### Hard Error
Hard error is permanent, it cannot be corrected by software.
Solution: replace with new hardware

### Error Detection and Correction
#### Parity
Detects one bit failure, cannot correct failure. 
**Even Parity**
	010010|0 
	011001|1
Even number of 1, then the parity bit is 0;
Odd number of 1, then the parity bit is 1;
**Odd Parity**
	010010|1 
	011001|0
Even number of 1, then the parity bit is 1;
Odd number of 1, then the parity bit is 0;

#### ECC
Detect 2 bits failure, can correct 1 bit failure. Hamming distance is 4.

#### Memory Mirroring
Each word is mirrored: 
• on write: the word is copied to two RAM banks 
• On read: when multi-bit error is detected, read data from mirror; permanent switch to spare bank 

#### Memory Scrubbing
**Why we need memory scrubbing?**
If a memory location doesn’t read/write for a long time, the bit flips will increment, after 3 bit-flips we cannot detect the error anymore. 
**Mechanism:**
- read ECC memory periodically
- correct bit flips before 2nd bit flip occurs

#### Fail-Fast[^1]
Fail-fast component will detect a failure as fast as possible, stop this failure to prevent it propagate to other components.
### IBM zSeries used Mechanisms[^2]
Prioritized Principles:
1. Ensure system/application integrity
2. Provide uninterrupted applications
3. Repair without disruption 
#### Faut Model
1. Transient: soft error
2. Permanent: hard error
#### Hardware Retry
When CPU detects a bit flip on bus by parity, simple retry to access memory.

#### Duplicate Execution to solve bit flips in ALU
Duplicate I-unit and E-unit and compare outputs. Updates to memory are maintained in an ECC-protected store buffer during instruction execution and transferred to an ECC-protected L2 cache when instruction execution completes. 

#### Instruction retry
When an error occurs:
1. CPU is reset and current store buffer contents are sent to L2. 
2. CPU rolls back to last completed instruction.
3. Retrying the instruction that caused the error.

If retry is successful, the failure was transient and the CPU resumes pipelined instruction processing. If not, the CPU will stop.

#### zSeries Parallel
Multiple mainframes can be connected together via a *coupling facility*. All mainframes in the system sharing data have equal access to shared disks as well as to the coupling facilities which manage the sharing.
From a software perspective, each mainframe is a clone of the others. Transactions are distributed to the mainframes via a Workload Manager that determines which mainframe is least busy for the particular type of job. 

### Tandem NonStop Mechanism[^3]
The general design principle was that there are at least two of everything, including power supplies and fans as well as the more obvious processors, controllers, and peripherals. Dual-ported controllers and dual-ported peripherals provided four paths to each device. 
#### Fault Model
1. Recoverable 
2. Nonrecoverable
#### Lockstep processors\*
Two microprocessors using the same clock have their outputs compared after each operation and immediately signal any discrepancy. 
**Approach**
- compare the output of two CPUs 
- very unlikely that both CPUs produce the same incorrect failure 
- if the result is not the same abort the result
**Problem: CPUs are non-deterministic**

#### End-to-End disk checksums
For each block, a checksum covering the data and block address is calculated in the processor, written to disk along with the data, and verified by the processor when the block is read. In the event of a checksum error, the data is read from the other member of the mirrored pair. 
#### CRC
Packets are protected by a (CRC) checksum; lost or corrupted packets are retransmitted.

### NonStop Advance[^4]
Instead of lockstepping microprocessors, the NSAA detects processor failures by comparing the outputs of I/O operations (both IPC and device I/O)

#### Loose Lockstep
Each process can execute in different clock and reties, etc. After the execution instead comparing the memory CPU writes to memory (as Lockstep). It will compare I/O stream instead of CPU writes.

**The problem is** Interrupts to the processor, such as I/O completion interrupts, arrive at each PE at slightly different times. If the processor were to immediately handle interrupt, each PE would be interrupted at a different point in its instruction stream. This divergent execution would result in asymmetric memory state in the logical processor. In order to keep memory symmetric, each processor element must handle interrupt at the exact same point in the instruction stream as the other PEs in the logical processor. 

**Solution**: Rendezvous
#### Rendezvous\*
**Goal**
Agree at which VRO an interrupt should be processed
**Protocol**
 1. Upon an interrupt arrival, each CPU proposes a VRO at which he can handle the interrupt. 
2. A voter component chooses a maximum VRO from the proposed VROs. 
3. Each CPU memorizes the maximum VRO chosen by the voter.
4. Each CPU continues execution until the chosen VRO occurs. 
5. Each CPU handles the interrupt. * 
#### UNPC-Store & UNPC-Trace
The UNCP-Store algorithm identifies process **state **that could be different in the PEs. It then chooses one PE (the source PE) and copies its values for that state to the other (target) PEs, putting the target PEs at the same execution point as the source PE. 

Due to copying some state from the source to the target PE(s), the UNCP-Store algorithm is **vulnerable to error propagation.** 

**UNCP-Trace**, it determines which PE is ahead, and by how far, and executes **instructions** in the trailing PEs until they are synchronized with the leader. 

#### Reintegration[^5]
The reintegration procedure copies the state of the running, on-line PE’s memory into the memory of the newly added PE. After the memory state is copied, the new PE starts executing the exact same instruction stream as the other PEs. 
1. Target PE do in-line cache loop, no access to memory
2. Target PE switches memory system to access write operation from the incoming reintegration link.
3. On-line PEs sweeps all of physical memory forcing a write-back of each cache line 
4. At the end of the sweep, the running PEs are momentarily stopped while their internal state is written to memory and their caches are flushed to memory. After the flush, the reintegration target memory is identical to that of the source. 

	 

	  









[^1]:	a.k.a Fail-Stop

[^2]:	More details in Paper 02-01

[^3]:	More details in paper [02-01] Section 2

[^4]:	More details on paper [02-02] section 3

[^5]:	More details on paper [02-02] section 3