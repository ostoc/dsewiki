# 07 Resource Management

## Resources

* Time - `see 05 Scheduling` 
* Driver - `see 06 Driver`
* Memory - `see 03 Memory`
* Other Resource - this chapter 

## Kernel Resources

Mostly of the resource management is memory.

Kernel Resource Management Problem

Ignored resource: kernel also needs memory to mange things, such as:

- Task: page tables, create located in physical memory.
- Threads, kernel-TCB, normally the kernel have the limits and can control how big is the stacks.
- Use pointer to mange the queues
- Mapping database, need a place to remember and locate the resources.

## Idea

- Memory management policy should not be in the kernel.
- Application should know how to manage the memory, the kernel only need to maintain the mechanism.
- excepted the initial task, managed by kernel

## seL4 Solution:

Untyped memory: an arbitrary block of memory has not been signed.
All unused physical memory after boot represented by untyped memory capabilities; these memory can be:

- granted: give the memory to other threads,
- split: split the memory to other thread.
- retyped: app retype Untyped memory to kernel objects.

**User code decides how to use them.**

put the object in the memory which user give to the kernel, and destroy the objects cause other kernel will need to use that memory location.

## Architectures

- Low-level(or no) abstraction, explicit management.
    - exoKernel (relay on libs)
- Hight-level abstraction, implicit management(traditional ways)
    - monolith???(all the management in the application)
    - resource containers
- Middle-level
    - multi-server(lower abstraction server manage the resource explicitly, higher server use another mechanism)

### Monolithic kernel

https://en.wikipedia.org/wiki/Monolithic_kernel

### ExoKernel 

https://en.wikipedia.org/wiki/Exokernel

More flexible, change different library and have different favor of the OS.

**Con**
- application cannot trust each other (only the kernel)
- no global management for resources
- need control sharing (application has not access to other app’s file system)

### Multiserver

## Resource Access

In example, we hope the manager won’t proxy all the access from the worker. Google Chrome browsers use this mechanism.

### Capability
Either you have the capability or doesn’t have.
No sophisticated rights representation.

Tem Cap for the work, manager manage the CAP for the works. Works cannot create new sessions and gain CAP.