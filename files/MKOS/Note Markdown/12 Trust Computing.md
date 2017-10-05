# 12 Trust Computing

## Mix in Monolithic v.s. Microkernel

**In Monolithic**

Mix is protect by the whole system based TPM

**IN L4**

Mix is separate from other tasks, Trust base is only include essential parts, such as MIX, TPM Driver, kernel.


## TPM

### Keys

**EK: Endorsement Key**

- Generated during manufacture 
- Unique
- Can only decrypt
- never leaves TPM

**SRK: Storage Root Key**
- Created when user *take ownership*
- parent of lower keys

**AIK: Attestation Identity Key**

### Features

**Authenticated booting**

* Passive method* Integrity measures are stored PCR* Provides proof to a third party of the configuration.

**Remote Attestation**

* A third party entity requests a machine to attest to its configuration along with a nonce.* TPM signs a PCR value along with the nonce and sends it to the requestor

**Sealed memory**

* Provide secure storage to application;
* Monotonic counters to prevent reply attack.

### Problems with current TPM (Hardware)

- Not support for virtualization
- Slow
- Linear chain of trust: not flexible

##TPM in Microkernel 

*Idea: per-application PCRs in software*

- Software TPM provides software PCRs for each application
- only measure base system into hardware TPM
- more flexibility and no limitation of applications

## VPFS - Virtual Private File System


VPFS can access secrets only, if its own vPCR and the vPCR for the app match the respective expected values. 

vPCR(VPFS) = vPCR(App)

## CRTM

*Core Root of Trust for Measurement*

How to make the chain of trust shorter, since BIOS and Boot Loader only used during booting. ==> DRTM

**Solution**

1. Put DRTM below OS
2. Run DRTM after booting OS


