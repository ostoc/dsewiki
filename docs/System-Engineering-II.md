---
title: System Engineering II
---

# Past Exams

## SE2 Exam WS 2015/16

1. How does MapReduce deal with stragglers.

   There was given a table with German States, population, City. You should describe with map/reduce tasks how one can make a table how many big cities does every state have. You don't have to write pseudo code. Just explain the input output.

2. Explain read operation in GFS.

3. Explain form the perspective of the client how to locate tablets in BigTable.

   Name 2 things Bigtable use in order to reduce traffic for round trips.(Bloom filter?)

4. 3 functions of Chubby (notification,locking,storage)

   Sketch how would you use chubby in your application. Don't explain how chubby could be used for master election.

5. Difference between Pastry and Chord (spatial locality)

   The ring of Chord is given with few nodes. The task is to make a finger table.

6. There was a diurnal graph. Explain why it looks so.

   Give a name of this graph (diurnal)

7. Which problem of MapReduce does Spark solve?

8. Dynamo, explain hinted handoff.

9. There was given a pre gel graph. The task was to say which vertexes would be inactive after superstep 1.

## SE2 Exam WS 2014/15

**MapReduce**

- System model of MapReduce.
- Steps in MapReduce, in terms of function.
- A picture in the lecture of MapReduce in page50 in slides [1], the task is to fill out names of main components, operations and data format in each step.

**Chubby**

- What service does Chubby provide?
- How to use Chubby to elect a master?

**P2P**

- Give two main characteristics of P2P system.
- Define consistent hashing.
- How is searching performed in Gnutella?
