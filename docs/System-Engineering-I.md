---
title: System Engineering I
---

# Useful Links

# Notes

# Past Exams

## SE1 Exam WS 2014/15

**Performance**

- Give 3 reasons why sequential access to RAM is faster than random.
- Suggestion on the underlying data structure.
- How does checksum mismatch happen? How to detect it?

**Idempotent**

- Define idempotent request.
- Which of the following is idempotent?
- HTTP PUT
- AppendEntries RPC
- RequestVotes RPC
- acquire lock

**CAP theorem**

- What's acronym for CAP? And what is the statement?
- Based on the assumption that we cannot sacrifice one of the properties, illustrate the impossible situation.

**Raft**

- Define primary/backup state replication.
- Define atomic broadcast, and compare to consensus.
- What kind of order does Raft guarantee?
- Why is atomic broadcast needed in primary/backup?
- Name 3 safety properties that Raft guaranteed.

## SE1 Exam WS 2015/16

- What is stateless protocol?
  - Advantages and disadvantages.
  - Hard state, Soft state, session state. What are these and how will they behave in terms of lifetime/availability.
- Describe in your own words what is FEC and how it solves error?
- Primary/backup. atomic broadcast.
- Lamport
  - Vector, compare to lamport
  - Name + and - from both.
- Raft
  - Split Votes in Raft.
