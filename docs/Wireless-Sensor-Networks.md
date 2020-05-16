---
title: Wireless Sensorr Networks
---

# Notes

Introduction
What's the difference between a wireless network with and without infrastructure?

A wireless network with infrastructure has basestations. Traffic between mobile nodes is relayed through these basestations. Mobility is supported by switching between basestations.
Con: The infrastructure needs administration. Con: You need to set up the infrastructure.

Why WSNs?

Interface computers with the physical world
Sense the physical world
Infer knowledge about the world
What is in-network processing?

Data is completely processed or at least pre-processed within the network. This reduces overall network data traffic. Redundant or uninteresting data can be removed before everything is transmitted to the base station.
What is a sensor node?

A sensor node integrates one or more sensors. It locally processes and stores data. It communicates with other nodes via a wireless link.
Name the 6 sub-systems of a sensor node!

Sensing sub-system
Processing sub-system
Communication sub-system
Actuation sub-system
Power management sub-system
Security sub-system
Constraints for a micro-controller?

Fast processing
Low active power
Constraints of the radio?

High data rate
Low power consumption
What are the pro and cons of narrow-band vs wide-band radios?

Narrow-band
Low power
Low data rate
Simple channel encoding
faster start-up
Wide-band
More robust to noise
Higher power consumption
Higher data rates
Compare radio vs flash!

In contrast to the intuition it might be more cost effective to send data via the radio than to write it to flash storage. However - in the end it always depends upon the usage scenario and the frequency of writes. Flash is power consuming.
Passive vs active sensors?

What's an actuator?

A device to act on the world. E.g. a vent controlled by the sensor.
Omnidirectional vs narrow field of view sensors?

Main issues designing a sensor node?

Cost
Lifetime
How good does the node perform when it is _not_ used a lot. How does it perform if it is used a lot?
Performance
Speed of processing (ops/sec, ops/joule)
Communication range and frequency
Is the node able to perform concurrent processing?
Reliability
Security
Size
Packaging
Sampling rate
Signal resolution
Sensor calibration
Sensor precision and accuracy
Sampling rate of the sensors
Name some different strategies of sleeping.

Just switch off the CPU
Switch off CPU and memory
Switch off CPU, memory and clocks
Different type of memory?

SRAM
DRAM
EEPROM
Flash
What is Dynamic Voltage Scalling? Wiki: Dynamic Voltage Scaling

Some things to note about sleeping:

going to sleep uses time an consumes energy.
Switching to a sleeping mode is beneficial if the time to the next event is sufficiently large
How much energy is used to transmit a packet with n bits?

The energy to transmit a packet n-bits long depends on:
The nominal bit Rate, R
Coding rate, Rcode
Total consumed power during transmission
The amplifier uses a lot of energy!

How much energy is used to receive a packet?

We consume power in the preamplifier and in the decoding logic.
Applications[edit]
Name some possible applications of WSN!

Gas pipeline
Structural Health Monitoring
Mining
Transportation
Agriculture
Active Volcano
What's about H2S monitoring?

Petroleum products are manufactured by refining crude oil at the company's refineries
Most crude oils contain sulphur, which make Hydrogen sulphide formed by the decomposition of unstable sulphur compounds.
Extremely toxic, colourless, flammable gas, heavier than air and soluble in water
Hydrogen sulphide are transported in pipelines
Damage by corrosion (long time use) or,
Other external cause
Network[edit]
A network is said to be connected if and only if data can be delivered from any one node in the network to any other node. Spot monitoring

Only a few sensors are need to be deployed, but one needs to know the exact pinpoint position where each sensors should be placed
Accurate but needs more time and knowledge of the field.
Suitable only for a preplanned deployment
Area monitoring

sensors are deployed in all regions where the source may spread across.
It requires a large number of sensors, and cannot thoroughly avoid blind spots even at high densities.
Fence monitoring

Constructs a maximum outer limit to guarantee that the target is in an enclosure.
Suitable for applications such as intrusion detection
The architecture of a wireless sensor network is determined by many factors: such as the number of information consumers (sinks), communication distance and energy budget, the need for collaboration, and mobility.

WSN are data centric instead of id-centric.

Flat topology

All nodes are equal. There is no hierarchy.

Energy intensive if we want to route data, because no fixed routes exist. They have to be build dynamically.

Carrier Sense Multiple Access Wikipedia

Physical Layer[edit]
What is the advantage of ofrared communication?

Infrared emitters and detectors capable of high speed operation are available at low cost.
It offers a virtually unlimited bandwidth that is unregulated worldwide.
Infrared transmissions can easily be confined to the room in which they originate => Security
Mac Layer[edit]
Objectives of MAC?

Establish communication link for data transfer
This is necessary for creating a basic network infrastructure
Regulate the access to the shared media such that communication resources are fairly and efficiently shared between contending nodes
Basic parameters which determine the performance of a MAC protocol

Energy efficiency
Latency
Scalability and adaptivity
Network size
Node density
Topology
Channel utilisation/channel capacity
Throughput (bit/byte per second)
The amount of data successfully transferred from a sender to a receiver in a given time
Fairness
Equal distribution of resources

# Past Exams

## WSN Exam SS 2015

- Few types of sensors were given. The task is to describe the architecture of the wireless node which you would use for these physical sensors.
- In TinyOS two applications are using two modules, third application uses separate module. Write down and describe communication via commands and events.
- Decribe details of super Harvard Architecture.
- What is advantage of duty cycles in sensor nodes.
- Apply pulse-code modulation to the signal using two digits.
- Compare probe-based and preamble based MAC protocols.
- Very simple question. The network with three routes and different number of hops is given. Also cost and energy for each hop are provided. Choose which path has 1) smallest latency 2) smallest cost 3) Maximum minimum energy
