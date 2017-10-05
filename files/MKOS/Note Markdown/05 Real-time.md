# 05 Real-time

## Definition

a real-time system denotes a system, whose correctness depends on the timely delivery of results

## Predictability

*Predicate when the task finish and how long it runs.*

**Why is hard to predict?**

- hardware runtime unpredictable
- crosscutting realtime, need consider all the layers’ realtime
- interrupts.

## Guarantees

*When schedule a task always guarantees the WCET is not a good idea. Most of the desk-top application is soft real-time.*

**Solution**

* guarantees even slightly below 100%
* use probabilistic planning


## Enforcement

* executing the schedule
* preempt tasks

*Scheduling = Admission + Enforcement*

### admission

- verifies the feasibility of client request
- formal task model
- calculates task parameters
- can reject requests

## Summary

- managing time is necessary
- we interact with the system based on time
- real-time is a cross-cutting concern
- **heavy-math admission in user land,  simple priorities in the kernel**
- priority inheritance by time slice donation
synchronization, delayed preemption