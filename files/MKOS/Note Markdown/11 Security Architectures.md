# 11 Security Architectures



## Some Security Method

### HW Isolation

- Hardware (space separate) separate,
- Data and Apps using different hardware.

### VM Isolation

- isolation enforced by visualization layer
- VMM control the VMs and run apps in different VMs

## TCB Reduce

To improve security: *Reduce size of TCB = smaller attack surface*

- Smaller TCB (only include critical components in to TCB)
- Split Apps (porting a whole application is hard to archive, split the app into small chunks and put the critical parts into TCB)
- Split OS (more complex, method: reuse + trust, means; Reuse untrusted infrastructure through trusted wrapper)

## App-Specific TCB

- Reflects Principle of Least Privilege
- TCB of an application includes only components its security relies upon
- TCB does not include unrelated applications, services, libraries

## Legacy reuse

- Reuse untrusted legacy software

## Trust Wrapper

-  Add security around existing API.

### Nizza

A example of secure reuse of untrusted legacy infrastructure

- Reuse: the legacy OS
- Trust: add wrapper or additional mechanism to archive trust. Let untrusted data pass through the TCB make it trustful.

The Nizza architecture enables us to extract those IPSec-specific functions and execute them in a separate protection domain. This technique dramatically reduces the vulnerability of this sensitive functionality. We call this IPSec component Viaduct as it represents the actual connection point between the private network and the untrusted Internet.

Mikro-SINA Architecture overview. The illustration shows two L4Linux instances running atop the Fiasco microkernel and the basic trusted services (L4Env). Each L4Linux instance can communicate with one NIC driver exclusively.* Both instances are connected (indirectly) via the trusted Viaduct.*

**Nizza Approach Summary**

- Strong isolation
- Application-specific TCBs
- Legacy Reuse
- Trusted Wrapper