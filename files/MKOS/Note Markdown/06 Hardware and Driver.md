# 06 Hardware & Device Drivers

## Intro

###Why drivers cause many system fault?
Highly coupled kernel & drivers - if driver has fault, propagate to kernel and cause problem.

### Solution

* Verification - make sure the driver is not fault
* Hardware assisted isolation - Paravirtualization
* Fault tolerance for device driver

## User-level Drivers

Separate drivers to User-level, decoupling the kernel and driver

### Isolate Components

Separate different device 

### Separate address spaces each

Different address spaces for different device, more robust components.

### Problem

* Overhead, more space to use; different spaces need context switches.
* when use many hardware at the sometime - HW multiplexing
* Need to handle I/O privileges - I/O drivers in User-level but I/O need be done in kernel since it is privileges operations.  

## System Layout

### How device interact with OS

* Ports
* I/O Memory
* Interrupts

## Ports 

### PCI 
 
*Peripheral Component Interconnect*

**Need to know:**

- Hierarchy of buses, devices and functions. A PCI can form a hierarchy system, can use bridge to connect to hierarchies.
- Configuration via I/O ports (input/output ports on devices, connected to bus)

### USB

Need to know:

- Tree structure: has root and leafs
- Root = Host Controller
- Device drivers us HC to communicate with their device via USB Request Blocks

## Interrupts

*Function: Signal device state change*

### How to handle multiple HW IRQs to CPU?

Use *Programmable Interrupt Controller(PIC)* to mange the HW IRQ to CPU IRQ. 

e.g. Network HW has port A for interrupts, USB HW has port B for interrupts. The PIC helps *prioritize* the interrupts and *map* them to the CPU.

### Handling interrupts involves

- Examine/manipulate device
- programming PIC
	- acknowledge: let device knows the interrupts
	- mask: high priority, mask other interrupts, preemptive
	- unmask: lower the priority, wait in the queue until CPU handle other interrupts

### L4 Interrupts Handling


**IRQ kernel object**

- represents arbitrary *async notification*
- **Kernel map hardware IRQs to IRQ object**

```
[USB HW]-----\       |      /-[IRQ Obj(USB)    |------|Driver Thread1|
[Display HW]--IRQs-->|Kernel--[IRQ Obj(Display)|-IPC-/
[Keyboard HW]/       |      \-[IRQ Obj(KB)]    |------|Driver Thread2|

1. Hardware interrupt maps to IPC message 
2. kernel send message to listening thread
3. Thread handles the interrupt 

```

**Thread handles IRQ Objects**

❖ *1:1: exactly one waiter(thread) per object*

`l4_irq_attach()` -> let thread attach to specific IRQ object

`l4_irq_recevice()` -> thread receive the IRQ object IPC message, get the interrupt form hardware to user level *Driver*

❖ *1:N: multiple IRQs per waiter*

`l4_irq_attach(N)` -> attach multiple IRQ object

`l4_irq_wait()` -> open wait for any IRQ object 

❖ *chain()ed: many IRQ objects may be chained to a master IRQ object*

**Disabling Interrupts**

*CLI(Clear Interrupt Flag)* - Interrupts disabled when interrupt flag cleared

## I/O

### I/O Ports

An I/O port is usually used as a technical term for a specific address on the x86's IO bus. This bus provides communication with devices in a fixed order and size, and was used as an alternative to memory access. On many other architectures, there is no predefined bus for such communication and all communication with hardware is done via memory-mapped IO. This also increasingly happens on modern x86 hardware.

### I/O Bitmap 

Control the port access. Allow device drivers access to I/O ports used by its device only


**L4 has per task I/O Bitmap**

- each task has its own I/O bitmap, contain the accessibility to certain I/O ports
- when switching a task, the I/O bitmap changed according to that task
- Allow per-task *grant/deny* of I/O port access

### I/O Flexpage: 

use the same idea of Flexpage to manage the I/O bitmap. Use special format to tell kernel that is for I/O bitmap.

kernel detect the Flexpage is for I/O bitmap, act accordingly

### I/O Memory

- it is not RAM, the I/O memory is the memory on certain devices, such as graphics card has its own memory
- instead access through the I/O port, we can use I/O memory directly via CPU like regular RAM access.
- the initial resource management (`sigma0`) get all I/O memory resource, map different I/O memory to different device drivers port.

### Direct Memory Access 

**Function:** bypass CPU by directly transferring data from device to RAM

**Reason:** improve bandwidth, and let CPU do more important job.

*Problems with DMA:*

- DMA uses physical address, memory need to be allocated contiguous. For example, Device memory has memory 4MB, but in memory only some part has 2MB, and another part has 2MB. With DMA you cannot separate physical address to different address. 

- no virtual abstraction

- DMA with physical addresses by pass Virtual Machine Management
- DMA has safety and security risk, change in the device memory affect the data in memory

### I/O MMU

In computing, an input–output memory management unit (IOMMU) is a memory management unit (MMU) that connects a direct memory access-capable (DMA-capable) I/O bus to the main memory. Like a traditional MMU, which translates CPU-visible virtual addresses to physical addresses, the IOMMU maps device-visible virtual addresses (also called device addresses or I/O addresses in this context) to physical addresses. Some units also provide memory protection from faulty or malicious devices.

- implemented in PCI bridge 
- manages a page table (I/O-TLB)
- restrict access to physical memory by only mapping certain IO virtual addresses into driver's address space (solve the DMA safety problem)

## Untrusted Device Drivers

The problem is we cannot trust a driver don’t use other device.

Solution: I/O Server creates a virtual buses, assign certain buses to correspond device drivers. 

