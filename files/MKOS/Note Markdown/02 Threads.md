#02 Threads

## Task 


```
| Kernel | Task1 | Task2 | ... |
--------------------------------
|     Virtual Address Space    | 

```

* Virtual address space spatial isolation, different tasks in different virtual address spaces. 
* Common memory content can be shared.

## Threads

**Basics**

* abstraction of code execution, CPU pointer to task address space and execute threads.
* unit of scheduling and temporal isolation: different time CPU execute different threads.
* requires a stack.
* may share the same address space 

```
|  Stack | <- CPU SP 
|  ..... |
|  Code  | <- CPU IP
|  Code  |

```

**Stack**

## Kernel's View

* maps user-level threads to kernel-level threads
* assigns threads to hardware
* one kernel-level thread per logical CPU 

### Enter Kernel 

Thread can enter kernel (change the IP and SP to kernel address space) via:

1. Voluntarily by system call
2. Forced: use interrupt or exception 

### TCB

Thread Control Block

* Kernel object, one per thread
* Stores thread's user land state while it is not running
* Untrusted parts can be stored in user space (UTCB)
	* UTCB use to store system call parameters  	

### Exit Kernel

When the kernel has provide its services, it returns back to user land, (Change the IP and SP from the saved user IP and SP)


## Scheduling

Scheduling decisions (how to prioritize the threads) are policies, should not be in a microkernel.

**L4 Policy**

```
|Pre.Thread|---->|Thread|---->|Next.Thread|
```

* each thread has an associated preempter 
* kernel send an IPC when thread blocks (! this is how to move the policy into user land. Kernel does not manage the policy)
* preempter tells kernel where to switch to

**L4 Scheduling**

* Higher priority serve first
* Same priority -> Time-slice-based round robin (each thread get the same slice of time)

```
TH1(0PRI) _________!======!_________

TH2(1PRI) =========________===^_____

TH3(1PRI) ____________________^=====

Kernel    [TH2----][TH1--][TH2][TH3-]

!: Interrupt arrive
^: Round robin end 
0PRI > 1PRI

```

## Synchronization

Need synchronization in *mutual exclusion* and *producer-consumer scenarios*, one can use locks but it cost CPU runtime (always checking the lock is free or not), or use atomic operation (AO is only can solve simple CS). L4 brings two different methods:

### Serializer Thread

A threads help multiple threads to solve the contention problem. It based on IPC communication. 

```
TH1   ST   TH2	 =:no-CS +:CS ---> IPC message
=           =
=           =
=---->=<----= 	TH1 & TH2 both want get into CS
+<----=	     	ST let TH1 in CS, TH2 blocked
+
+---->=---->= 	TH1 done, ST let TH2 in CS
=           +
=           +    
```

### Semaphores

Serializer and atomic operations can be combined to a nice counting semaphore

```
P(S): IF S  >  0
     	 THEN  S :=  S - 1
		ELSE (wait on S)

V(S): IF  (one or more process are waiting on S)
       THEN (let one of these processes proceed)
      ELSE   S := S +1


TH1   ST   TH2
=	  1	    =   ST has a shared counter
=	  1	    =
=--P->0<-P--= TH1 set counter to 0
+			    TH2 wait S (counter = 0)
+
+--V->0--V->= TH1 wake up TH2 into CS
=           +
=           +
```


**Benefits**

* Cross-task semaphores, when counter in shared memory
* *IPC* only in the contention case (need IPC message to communicate when contention happens, like wake up other thread.)








