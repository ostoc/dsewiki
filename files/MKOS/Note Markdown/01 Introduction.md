#01 Introduction

## From Monolithic to Micro

Kernel: A bridge between application and hardware. Help and manage, separate, provide interface for application to access the hardware resources.

### Monolithic Kernel

Provide all the function and system call for application to use. Very comprehensive and powerful. 

**Problems**

* All components run in supervisor mode, direct access to all kernel-level data. Easy to be rooted
* It has to fit all the hardwares, most code of the kernel is drivers, that cause unpredictable crush.
* Complex and hard to maintain the kernel.

### Microkernel

> Def. A kernel that provides only the minimum OS services.
> 
> **Kernel only provides inevitable (must be in a kernel, keep it minimum) mechanisms, does't enforce policies**
> Inevitable Mechanism: 
>
> Abstraction:
>
> * Threads
> * Address spaces (Tasks)
>
> Mechanisms:
> 
>* Communication
>* Resource Mapping
>* Scheduling

**Advantages**

* OS personalities 
* Customizability
	* Such as, tailored memory management/scheduling/ realtime	
* Well-defined system design



## Case Study: L4/Fiasco.OC

### Object

Everything in L4 is an object. 

**Types of Object**

* Kernel Object: Thread, Tasks, IRQs, etc. 
* Communication Object: IPC Gate
* User-level Object: Networking stack, File system.

**Kernel Provides**

* Object creation/management
* Object interaction: Inter-process communication

**Create Kernel Object** : `factory()`

**Create new object in user-level application:** `IPC Gate`


### Capability

Global object IDs are insecure and inconvenient. Fiasco is Capability based: local names for objects. Object capability required to invoke object. 

**Capability**
* Reference to object* Associated with access rights* Can be mapped from task to another task

**Capability Table**

* is task-local data structure in side the kernel 
* Similar to page table* Valid entries contain capabilities

### More L4 Details

Threads: Chapter 02

Memory: Chapter 03

Communication: Chapter 04

Interrupts: Chapter 06






