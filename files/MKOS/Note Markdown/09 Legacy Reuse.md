# 09 Legacy Reuse

## Single Server Solution

*Virtualize OS + APP*

* + all services provide are available from the system’s legacy.
* - limited isolation in especial solution in microkernel .

## Multi-VM: 

same hardware + different VM

* + better isolation
* + communication between different VM, via virtual network.
* + better utilization
* - resource consumption

## Virtualization:

*reuse the legacy from OS + application*

Problem in Virtualization

* Application trapped in VMs, the application has to live in the VMs.
* overhead due to the (run a) FULL legacy OS (e.g memory)

## Optimize Virtual Machine 

- Hardware level virtualization (Virtualization, e.g. V-Box)
- Operating system level (e.g. Wine)
- Application level (Java VM)

## Operation System Personalities

*Idea: NOT implement full legacy OS, use personal settings.*

- **Con:** may need to recompile application? Why? API in system level is not support, need in Application level
- **Pro:** Get desired application, established APIs; more flexible, included configuration; Better integration

## Implementation

### Central Server

*Idea: middleware between application and hardware, which provide all the APIs application needs, consistent view for both side.*

**Problem:**

- Scalability - all the apps need go thought the single central server;
- Single point of failure;
- High complexity

### Emulation Lib

*Emu lib linked to application, the emu lib can be personalized. Provide consistent view. Different from Central Server is that, each application has a personalized lib.*

* *Compatibility:* emulation library hidden below libc

* *Methodology:* reuse libraries (libc, etc) map to existing APIs

## LibC

A C library to support POSIX stander. Provide common functionality. 


## Legacy OS as Toolbox

*Idea:  reuse drivers in natural environment, adaptor design pattern.*