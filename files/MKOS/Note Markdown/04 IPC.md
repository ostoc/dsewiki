# 04 IPC

## Purpose

* Exchange data 
* Sync - thread scheduling `see 02 Threads`
* Sleep, timeout - set the recipient to non existed thread, wait for certain amount of time
* HW/SW Interrupts - IRQ to Kernel, kernel to thread `see 06 Drives`

## Design Space

### Asynchronous IPC

* First send the message  
* Later other threads will pick it up
* a pool (message buffering) mechanism

Problems: 

* data copied twice, redundancy, latency
* DoS, message blocked on kernel memory (Pool get full or).

### Synchronous IPC

Two threads are communication at the same time, no wait

Sender sends the message, get blocked until recipient receive the message. 

**Compare to Async IPC**

* no problem of Async IPC 
* faster
* less flexible

## L4 IPC Flavors

### Basic Features

**open wait:** wait for any thread send the message

**closed wait:** wait message from certain thread.

**send:** send message

**Client-server:**
	* client => send + close wait
	* server => send + open wait 


**Why is there no broadcast in L4?**

* reply to no where, the broadcast mechanism no need to support.

### Advanced Feature

+ Timeout: set a maximum time for wait partner to become ready. 
+ Exceptions: certain conditions for exception purpose. such as: used for PF Handling.


## Implementation

### IPC-Gate

**Referenced through a capability**

**Created using factory object**

`target_cap` get the communication capability, get a free slot in `cab_table`

**Bound to a thread**

`thread_cap` bound to the recipient 

IPC channel are *uni-directional*: sender can send to receiver, and recipient can reply to that sender, but receiver cannot send to another sender.

Anyone with the gate capability may send, only bounded thread receives. 

**Add a label**

used for distinguish the different sender 

**Receiving**

* receiver call `open_wait()`
* wait message on any of its gates
* receive system call returns late of the used gate? 

**Replying**

* Receiver doesn't know sender
* Kernel provides implicit reply capability ??


### UTCB

*User-level Thread Control Block*

```
Structure of UTCB

|Message Reg.|Buffer Reg.|Thread Control Reg.|

```

**Message Register** 

Store everything you want to send directly to the kernel. 

*e.g.* 

* in system call: store parameters

* in ICP: store data which send to recipient 

**Buffer Register**

Store flexpage descriptions 

**Thread Control Register**

Store private thread depends data, never copied to recipient. 


### Message Tag

* Protocol
* Flags
* Items - indirect message, store: address,for mapping
* Word - direct message, store: plain text, copy the data
  

## Security & Control

*Control who communicate with whom (control the data flow)*

### Communication Mechanism

**L4v2: clan based.**

* clients in the same clan can communicate.
* if client wants to communicate with another client in other clan, it has to go to the master of the clan first and get the permission.

**Mach: rights control**

Only the object holds the rights can communicate.

**Fiasco: Reference monitors.**

communication is allowed if certain flexpage(consider as a VIP ticket) has been mapped to sender

only the client has vip ticket can do IPC message. It is a center pool to manage the permission. Client go first to the monitor and check the permission. Check once and then communicate directly to another client.

### How to find a serve

* **Global name service:** like DNS, register server first and query the name to get services’ local name;
* **Hierarchical naming:** multiple DNS server with parent DNS, add hierarchy to the name server.

## Async IPC

**When a system need an async IPC?**

* High throughput 
* **IRQ kernel object** 
* Shared memory

### Shared Memory

Use async IPC to share memory between two threads. Use Producer-Consumer mode. Only sync data when it needs.










