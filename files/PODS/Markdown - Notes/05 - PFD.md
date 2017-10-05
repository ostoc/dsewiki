## Perfect Failure Detector
### Failure Model
- Fail-operational model: a safety-critical[^1] system which is without a safe state when the computer subsystem has failed. (e.g. Fly-by-wire)
- Fail-safe model: a safety-critical system that has a safe state. (e.g. Railway crossing. When the system is failure, we can stop this system and it won’t cause further problem)
**Sometimes one can convert a fail-op into fail-safe by using backup system**

### Fail-over Operation
- Basic idea: when Primary server fails, switch to Secondary server. 
- Practical problem: sometimes the Primary is just delayed, but Secondary server has already took over. When Primary is up again, will cause inconsistent data. 
- Hardware solution: use shared SCSI bus.
- Software solution: perfect failure detector.

### PFD Properties\*
- Accuracy: each process which is suspected, is crashed.
- Completeness: eventually the crashed process will be suspected by each correct process.
- Monotonicity: if process p suspects q, then p will permanently suspect q. 
*PFD to MPFD is just add the assumption that crashed process will never recover*

### Completely Synchronous System
If a system is synchronous system[^2], it has to fulfill these properties:
- all messages are delivered within δ
- scheduled events are executed within σ of their scheduled time
- clocks are internally synchronized [^3] 
- the number of process is finit N
#### Process Service
A process P can request to execute some action a clock time T, and should be awaken and execute action within `[T,T+σ]`

#### Process Failure Assumption
A process crashes by stopping to execute its program (fail-stop) 
- only crash failures are permitted and at most F \< N processes can crash 
- process p is correct in time interval `[s,t]` iff p is at no point in `[s,t]` crashed 
#### Datagram Service
The message transmission delays should be less than δ
#### Clock in Synchronous System
- Drift Rate
- Internal clock synchronization[^4]
- External clock synchronization[^5]  

#### Implement Synchronous System
*Contention and queuing delays are problems when we try to build a Synchronous System in real world. If you cannot predict and avoid this delay, the upper bound for time in code won’t work.*
**Solution: Time-triggered ethernet**
- Assigned different time slot to different process to avoid contention.
- Segmentation of network (build more path for connection). 
- Sometimes 2 sensors send message to process, but the rate is too fast for process. Process will drop off some message. We need to handle this problem by restrict some nodes’ speed.

**Fault tolerant**
*When there is only on TTE in the system, it suffers single point of failure, and sometimes there is babbling idiots in the system keep send meanness message*
**Solution:**
- Secondary TTE for safe-critical process. When one of the switch is not working, the backup TTE still can handle the important messages.
- Guardian: if the sensor sent a message out of his time slot, the guardian will stop forwarding this messages.

### Implement PFD in Sync. System
#### Pull mode
- Basic idea: failure detector polls information from remote process. P sends FD request to Q, if Q replies in, P considers Q is still alive. 
- Time constant: 2(δ+σ); δ is transmission delay, σ is scheduled execution time.

#### Push mode
- Basic idea: failure detector broadcast alive messages to other process periodically. If after certain period time, P didn’t get message from Q, will consider Q is failed.
- Time constant: P+σ+δ+σ+Δ; P is periodic interval, Δ is internal clock deviation. 

#### Comparison (Time and #messages)
In pull mode, detector knows the status of crashed process very shot, only in `2(δ+σ)`; if the process only interested in certain process and ask infrequently, the message will be more less. 

### Timed Asynchronous System

#### Process Service
A process P can request to execute some action a clock time T, and should be awaken and execute action within `[T,T+σ]`

#### Process Failure Assumption
- **Performance failures**: process execute the event later than  `[T,T+σ]`
- **Crash failures:** process crashed

#### Datagram Service
At most once, request is sent again in case of failure, but request is filtered on the server for duplicates. 

**Performance failure:** message transmission delay \> δ 

**Omission failure:** message transmission delay = ∞

#### Local Hardware Clock Service
Each process has a correct hardware clock, that means the clock has the following property:

`(t−s)(1−ρ) ≤ Hp(t)−Hp(s) ≤ (t−s)(1+ρ)`

**No external or internal clock sync required**

### PFD in Asynchronous System
* Why we cannot have PFD in asynchronous system?
Consider the situation in which somebody accidentally disconnects the network cables of participant `c` for more than 2δ time units. After 2δ time units, failure detection on participant `d` will incorrectly suspect `c`.  However c connected after certain time. D will violate the properties of prefect failure detector.  

#### Simulated PFD
#### Alternative. Paper Section
- Lease based
- Local hardware watchdog
- Distribute snapshot


[^1]:	most of real-time system is safety-critical system, when it failures, may cause life at risk 

[^2]:	alias Real-time System

[^3]:	|Cp(t)-Cq(t)| ≤ Δ, Δ is the maximal internal clock deviation

[^4]:	the deviation with other process is in a certain bound

[^5]:	The deviation with realistic time is in a certain bound