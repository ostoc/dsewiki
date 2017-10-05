## Main Memory
### Memory Architecture
CPU - Channel(Bus) - Memory Controller - Memory Modules (DIMM)
**Memory Controller**: Memory controller contains the logic necessary to read and write to DRAM, and to "refresh“[^1] the DRAM. Without constant refreshes, DRAM will lose the data written to it as the capacitors leak their charge within a fraction of a second.

**SRAM vs DRAM**
- SRAM is fast and most of the time used as CPU cache (L1,L2), the data stays on SRAM is longer than DRAM. 
- DRAM is slower and uses transistor, it’s more dense than SRAM, used as main memory. 

**Memory Rank**: is a set of DRAM chips connected to the same `chip select` and can be accessed simultaneously. They also share all the other command and `control signals` and only the `data pins` for each DRAM are separate. 

**Memory Bank[^2]**: a bank consists of multiple rows and columns of storage units and is usually spread out across several chips. 

**Channel**: is a synchronous bus, connect between DIMM and memory controller.

**RDIMM**: has a register which placed between the memory and the memory controller, and the register re-drives command, address and clock signals.

**Load Reduced DIMM (LRDIMM)**: modules are similar to RDIMM. LRDIMM modules has memory buffer which buffer both control and data lines while keeping the parallel nature of all signals. LRDIMM memory provides large overall **maximum memory capacities**, and reduce channel signals. 

### Dependability Implication
1. Power: the main memory will lose all the state is the power is off. We should design a redundant power supply to tolerant this kind of failure. 
2. Crash: program or process crashes will cause the corrupted memory state. After the process recovered, the pervious state may lose. 
3. Temperature: higher temperature means higher leakage on DRAM, we need to adjust the rate of refresh DRAM dynamically. 

### RAS Mechanisms
- Reliability: keeps data integrity(1. error detection and correction; 2. prevent error propagation)
- Availability: guarantees access data uninterruptedly 
- Serviceability: provides simplified method to deal with failures

### DRAM Correctness
If CPU reads memory cell `i` at time `t`, it receives the most recent value written to cell `i` before time `t`.

### DRAM Fault Model
- Stuck at fault: stuck at a certain value
- transition fault: bit-flip
- Coupling fault: transition of cell i causes transition of cell j
- Address fault: R/W the wrong cell

### Detect and Correct
- Parity
- ECC
- ChipKill: if one chip provide wrong data, the data will be eliminated. Use extra ECC bits to mask that fault.
### Parity Correct in Example
Parity data is used by some RAID levels to achieve redundancy. If a drive in the array fails, remaining data on the other drives can be combined with the parity data (using the Boolean XOR function) to reconstruct the missing data.
For example, supposes two drives in a three-drive RAID 5 array contained the following data:
	Drive 1: 01101101
	Drive 2: 11010100
To calculate parity data for the two drives, an XOR is performed on their data:
	    01101101
	XOR 11010100
	    10111001
The resulting parity data, `10111001`, is then stored on Drive 3. Any of the three drives fail, the contents of the failed drive can be reconstructed by subjecting the data from the remaining drives to the same XOR operation. 
If Drive 2 were to fail, its data could be rebuilt using the XOR results of the contents of the two remaining drives, Drive 1 and Drive 3:
	Drive 1:    01101101
	Drive 3:    10111001
	XOR Parity: 01101101
	Rebuilt:    11010100 

[^1]:	Implication: The refresh rate should be high enough to avoid bits flip.

[^2]:	Smaller bank can reduce the latency; More page hits, lower latency