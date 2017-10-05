# 10 Virtualization

## Intro

**What is virtualization?**

They defined a virtual machine (VM) as an efficient, isolated duplicate of the real machine that is established by a control program, which they call a virtual machine monitor (VMM)

**Why we need the virtualization?**

- To support *legacy app* and devices without rewrite other support
- Simplify the develop process
- Gain more support


## Emulation 

Like an Android emulator on computer, the emulator behaves as same as a real Android phone.

Emulation most of the time are slow and complex due to the hardware & instructions sets are difference between Guest & Host.

Ideally if G = H, means the instructions interpreting are the same and nearly same speed on Guest and Host.

### From Emulation to Virtualization

A virtual machine is defined to be an “*efficient, isolated duplicate of a real machine.*”

**Idea:** Just run the guest operating system as a normal user process on the host.



If all sensitive instruction are privileged, a VMM can be written. 

* execute guest in unprivileged mode,
* emulate *all* instructions that cause trap. 
 
> **Trap:** A trap is an unconditional control transfer from unprivileged to privileged mode executed by the processor.

**Emulation v.s. Virtualization**

Emulation is using software to provide a different execution environment or architecture. For example, you might have an Android emulator run on a Windows box. The Windows box doesn't have the same processor that an Android device does so the emulator actually executes the Android application through software.

Virtualization is more about creating virtual barriers between multiple virtual environments running in the same physical environment. The big difference is that the virtualized environment is the same architecture. A virtualized application may provide virtualized devices that then get translated to physical devices and the virtualization host has control over which virtual machine has access to each device or portion of a device. The actual execution is most often still executed natively though, not through software. Therefore virtualization performance is usually much better than emulation.

## VMM

> **Definition:** A virtual machine monitor (VMM, or hypervisor) is a host program that allows a single computer to support multiple, identical execution environments (create VMs). 

**VMM should:**

- First, it provides an environment for programs that is essentially identical to the original machine;
- Second, programs running in that environment shall have little decreases in execution speed;
- Finally that the VMM is in full control of the system’s resources

### Location of VMM

**Type 1 is implemented on the bare metal (more near the the hardware) runs as kernel**

- no OS overhead (cause it virtualize the hardware resources)
- complete control over host resources
- high maintenance effort (need to care about the drivers, etc.)

**Type 2 is build on OS, run as app on a conventional OS (or program, like VirtualBox)**

- reuse the OS drivers
- lower performance than type1
- need kernel support for access to CPU’s virtualization

### Paravirtualization

No need to virtualize the whole OS, just port a guest OS to the interface of your choice.


- involves modifying the OS kernel to replace non- virtualization instructions with hyper calls that communicate directly with the virtualization layer hypervisor.
- guest OS is recompiled prior (tailor the interface of your choice) to installation inside a virtual machine.
- + improve performance and efficiency
- - need recompile from the source code!


### Reimplementation of Guest OS Interface

**Example:** WINE, run Windows software on Linux without fully vitalization the guest OS.

## L4Linux

L4Linux is a port of the Linux kernel to the L4 microkernel API. It is a para-virtualized Linux kernel running on top of a hypervisor, completely without privileges.

L4Linux runs in user-mode on top of the µ-kernel, side-by-side with other µ-kernel applications such as real-time components. It is binary-compatible with the normal Linux/x86 and ARM kernel and can be used with any Linux distribution.

**Objectives**

- reuse existing/legacy software
- security (gain)
- consolidation (some resource are idle, less waste, save power)


