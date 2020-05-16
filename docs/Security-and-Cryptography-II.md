---
title: Security and Cryptography II
---

# Useful Links

[IFSR | German](ftp://ftp.ifsr.de/komplexpruef/Security_and_Cryptography_II/)


# Notes

Which anonymity technologies are there?

Broadcast
Query and Superpose
RING-Network
DC-Network
MIXes
What does broadcasting provide?

Recipient anonymity
What is an implicit address?

If you want to use broadcasting on routing services every node must decide through an attribute named implicit address which messages are actually for it
How can implicit addresses be implemented?

The usual implementation of invisible implicit addressing employs redundancy within the message content and an asymmetric encryption system. Every message is encrypted completely or partially with the encryption key of the addressed participant. After the decryption with the corresponding key the user station of the participant addressed can determine (with the redundancy inside the message) whether the message was designated for him.
How can a broadcast be attacked?

Attacker can choose certain recipients, and send the messages waiting for response. Using the method, attacker can decrease the anonymity.
How can one defend against that attack?

Insisting on error free receipt a sending of the user station is necessary.
What are the limitations of broadcasting?

Broadcasting is very inefficient if not supported by transport media; e.g. it's easy to do broadcasts in radio networks, but difficult in the internet.
How does query and superpose work?

On Scripts, P201 5.4.2
What are the optimizations?

Sending a Pseudo-Random Bit Generation (PRBG) seed instead of the random vectors
Using padding keys and a local master to do the superposing
What must be encrypted on the lines?

Everything
If a PRBG seed is sent instead of the random vectors, and only one vector (which is calculated) is sent to a server, does that vector still need to be encrypted?

Yes! If the server that receives the only full vector is the only honest one (as per the attacker model) and all other stations are attackers, anonymity is lost
How does the DC-net work? What are the optimizations?

Superposing in local subnets and broadcasting intermediate results
Establishing a server, having that server do the addition (instead of the clients) and broadcast the result to all stations
What is the attacker model?

Attacker can disrupt communication and attack availability, but he won't violate anonymity
How is the DC NET (or DC+ NET) protected against modifying attacks? E.g. the attacker disrupts one line and a station gets a wrong global sum, what happens then? Is anonymity violated? Is availability violated?

In DC+ NET, keys depend on global sums from previous rounds. If only one station receives a corrupted message in one round, its global sum will be corrupted too, meaning that in the next round, its keys will be corrupted, and as a result, it will broadcast a corrupt local output and the global sum will be garbage. Availability is violated, but anonymity is not!
How do MIXes work? In a direct sender anonymity scheme, how does a message look if there is one MIX in between the sender and the recipient?

The message could look like cm(z2,A,cr(z1,M)), where cm is the public key of the MIX, cr is the public key of the recipient, z1 and z2 are random numbers, A is the address of the recipient and M is the real message.

# Past Exams

## SCII Exam SS 2014

Lehrveranstaltung: Security_and_Cryptography_II

Modul: INF-BAS4
Semester: SS 2014
Prüfer: Prof. Strufe
Prüfer: Dr. Köpsell, Prof. Strufe

- Lieblingsthema DC Netze, Funktionsweise allgemein erklären, Größe der
- Anonymitätsgruppe der Teilnehmer in einem Beispielnetz; Wenn E nur mit C
- Schlüssel austauscht und C bösartig ist, ist E nicht mehr anonym -> mitallen Schlüssel austauschen.
- Welche Themen wurden noch behandelt? (Verteilung, Abfragen, Ring/BaumNetz, MIXe)
- Wählen Sie eins: -> Ring, erklären, n-anonym. Gibt es Einschränkungen bzgl der Anonymität im Ringnetz?
- Erklären sie noch ein Netz: MIXe, ein MIX, welche Aufgabe haben die einzelnen Schritte der Funktionsweise eines MIXes?
- Duplikate, Unverkettbarkeit über Zeit, Reihenfolge, Aussehen, und alle Nachrichten gleicher Länge.
  Modul: INF-BAS4
  Semester: SS 2014
  Prüfer: Dr. Köpsell
  Prüfer: Dr. Köpsell, Martin Beck
- Was kennen sie denn für Möglichkeiten von anonymer Kommunikation?
- Was möchten Sie mal genauer erklären? (MIXe genommen und grob erklärt)
- Was heißt umkodieren und haben MIXe noch mehr Aufgaben als das?
- Warum keine Wiederholungen?
- Wie funktioniert Senderanonymität?
- Kann man auch irgendwie Empfängeranonymität herstellen?
- Wie funktioniert die anonyme Rückadresse?
- Was möchten sie noch erklären? (Abfragen & Überlagern genommen und erklärt)
- Was für Sicherheit wird erreicht?
- Wie kann man das Schema effizienter machen?
- Wenn man nur noch einen Abfragevektor schickt, muss der dann trotzdem verschlüsselt sein?
- Stefan Köppsel ist hilfsbereit, fragt aber auch gern nach, wenn man sich nicht präzise ausdrückt. Hatte zwei, dreimal das Gefühl, etwas falsch zu erklären (wegen Nachfragen), was aber letztendlich völlig unberechtigt war, also indem Moment keine Panink bekommen, sondern vielleicht nochmal mit anderen Worten, oder genauer erklären.
