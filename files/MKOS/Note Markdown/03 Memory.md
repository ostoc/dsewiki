# 03 Memory

## Booting Fiasco.OS
```
=> BIOS
=> Boot Loader
=> Bootstrap: load & launch Fiasco.OC kernel
=> Fiasco.OS: Initialized `Sigma0` (root pager), Moe (root take)
```

## Page Fault

A page fault is a type of *interrupt*, called *trap*, raised by computer hardware when a running program accesses a memory page that is mapped into the virtual address space, but not actually loaded into main memory. 

### PF in Microkernel

PT modifications are privileged operations, must handled in kernel, *however* the policy should not be in the kernel.

=> A user-level thread (Pager) handle the PF.

### Memory Manage Operations

**Grant.** The granted page is removed from the granter's address space and included into the grantee's address space.

**Map.** Thread maps its address space to another thread's address space. After mapping, both threads can access the address. In contract to *grant*, it is not removed from operator's address space. *map() creates an entry in the receiver's address space pointing to the same page frame*

**Unmap.** The unmapped page remains accessible in the mappers address space, but it removed from all other address space that had received the page indirectly or directly from the mapper. *Kernel tracks mappings in a database, for unmap operation*
 

### PFH in Fiasco.OC

**Steps**

```
Pager Invocation
|Application|-1->|Kernel {PF Handler}|-2->|Pager|

Pager Reply
|Application|<-4-|Kernel {PF Handler}|<-3-|Pager|
```

1. Page fault occurs, send a exception to *PF Handler* in kernel
2. *PF Handler* translate to IPC message and send to responsible *Pager* of that fault thread.
3. *Pager* finds which area should be mapped, send information (flexpage) to *PF Handler*
4. *PF Handler* modifies the page table based on Flexpage and resume execution in the application.  

**Details**

**Pager:** each thread has a pager assigned

**IPC message:**: store the fault address and fault EIP in UTCB

**PFH is done outside the microkernel and only the *grant*, *map*, *unmap* operations are done inside.**


## Flexpages

Flexpages represent resources attached to an address space, to describe *Memory pages*, *I/O Ports*, *Capabilities*

### Flexpages Offset (wrong?)

```
Flexpage Recipient: |4000|5000|

Flexpage Sender: |0000|1000|2000-(PFA)-2FFF|3000|

PFA: Page fault address, 20FF

Targe position: 40FF

Flexpage Sender: |5000|

Flexpage Recipient: |0000|1000|2000-(PFA)-2FFF|3000|

PFA: 20DD

Targe position: 50DD

```

**Offset Calculate**

* Alignment the Flexpage, bigger Flexpage divided into smaller Flexpages.
* Calculate the offset from the smaller Flexpage start address. 
* The Send Base point which small flexpages should be mapped. 

### Flexpage with PFH

Kernel page fault handler sets receive window to whole application address space.

Pager can map more than just one page, where the page fault happened to the client. 

## Hierarchical Pagers

### Root Pager 

`Sigma0`: 

* Root resource pager (manager) for all hardware resource memory. It is idempotent to the physical memory of the machine. 
* it never has PF.
* Other pagers build based on `Sigma0`

**Why hierarchical pagers?** 

If only has `Sigma0`, we cannot do all the advance management mechanism. 

## Region Manager

*Manage the view of pager layout of a task*

**Why we need a region manager?**

√ if two pagers manage a same application, it may cause conflict, since the application doesn't know which pagers should handle the page fault. 

**Region Map**

A table maps the address space region <start,end> to it pager.

```
|Address  |Pager #|
|00ff-10ff|Pager 1|
|29ff-33ff|Pager 2|

```

**PFH with Region Manger**

1. Region Manager should see all PF of the task, the Fiasco.OC redirects all page fault message to *RM*.
2. *RM* calls pager based Region Map, then the pager do the rest. 

## Dataspace 

*High-level Memory Abstraction*

Pager & Region Manger only handle the low-level memory management (page), to application the memory management has more higher level, this why need *Dataspace*.

**Dataspace:** is an unstructured data container, abstracts any system entity that contains data.


**Dataspace Manager**

```
Dataspace Manager ==implements=> 
                    Dataspace ==attache=> 
                                    Address space 
```

Dataspace Manger plays the role as Pager

Region Manger and Region Map play the same roles.

**FPH with Dataspace**

1. App attaches a data space to a virtual memory region, tracked in Region Map
2. App occurs PF
3. Region Manager is notified by Kernel IPC
4. Region Manager translate page faults to Dataspace based on Region Map.
5. Region Manger forwards message to corresponding DM
6. DM maps the data 
7. Kernel modifies the page table
















