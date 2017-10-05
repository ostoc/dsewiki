## Introduction
### Concept
**Dependable System**
It is a system for which the probability of a system failure is negligible (below certain threshold). 

**System Failure**
It is the deviation of the behavior of a system from its specification.

**Failure Propagation**
Fault cause of an error, incurs incorrect internal state. Finally cause failure which is externally visible deviation from specification.

### Failure/Error/Fault
#### Definition
- Failure is externally visible deviation from the expected result.
- Error is incorrect internal state
- Fault is the incorrect which cause of an error.
#### Detection
- Failure, observer the behavior of component, detects deviations from its specification. 
- Fault, check input before updating state
- Error, detect when the state become incorrect.

Note: The detector may not detect all the system failures. The probability of undetected failure = p\*q; p = failure probability, q = probability of detector makes wrong detection\* 
### Fault Masking
#### Triple Modular Redundancy
3 components provide the same service, and voter takes the inputs and masking the fault uses majority of 3 components’s outputs. 

**Properties**

* Failure of component should be independent, 3 components won’t interfere each other. (Implemented in different version. A.k.a N-Version Programming)
* Outputs are deterministic.  

#### Fault Masking via Detection
C3 uses fault detector for C1 or C2 to select correct output. If one of C1 and C2 is correct, C3 can mask the fault, otherwise fail-stop. 

**Compare to TMR **

- Detector normally use different implementation, and can remove the common mode failure and improve independence
- It’s more cost effective than TMR.

#### Fault Masking via Reconfiguration
If one component is fail, then start a new component to mask that fault.

### Fault tolerance
If the system can prevent the propagation of system failure. 
- Fault Masking: after detect a fault, the system mask the fault or stop it becomes a error.
- Error Detection and Recovery: role back to good state; or roll forward to good state, escape the corrupted state.
- Reconfiguration: switch to a better component to continue the task. When switching the component may hot/warm/cold.[^1]

### Design Dependable Systems
10^-9 Challenge = 1 failure / 10^9 hours
### Divide & Conquer
- program is correct
- program is executed correctly
- correct program is executed
- our failure assumptions are correct 

[^1]:	Hot: spare component is synced to current state, can take over the task immediately.
	Warm: spare component is not in latest state, but can recover very quickly. 
	Cold: spare component doesn’t have any state, needs to initiate.