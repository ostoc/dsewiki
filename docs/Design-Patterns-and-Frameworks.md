---
title: Design Patterns and Frameworks
---

# Useful Links

http://tu-dresden.de/die_tu_dresden/fakultaeten/fakultaet_informatik/smt/st/studium

http://st.inf.tu-dresden.de/content/index.php?node=teaching&leaf=1&subject=225&head=4

https://www.dropbox.com/sh/s070vtson86s262/AAD6MuWPrNyuqb7J8VG6MFpja?dl=0

# Notes

What is a Design Pattern?

Standard solution for standard problem (look @ GOF book)
Why do we have Design Patterns?

Reduces code, increases re-utilization of code
Design Patterns are not invented but discovered (aka they grow historically)
What kinds of pattern categories do we have

Creational Patterns
Patterns which are made for varying construction of objects (e.g. Factories)
Variability Patterns
They don't add anything new at runtime
Strictly speaking Creational Patterns are a subtype of Variability Patterns
e.g. Strategy, Template Class
Extensibility Patterns
They can add objects at runtime
Glue Patterns
e.g. Bridges, Proxy
Bridges can also be Chain Bridges, if we have a Bridge referencing a Bridge and so on.
Bridges can be Multibridges, if one class references multiple bridges they enrich objects at runtime (to make them fit together)
Facets are orthogonal (reminder: Meat Eater, Vegetarian, Vegan)

They are "dimensions"
They can be implemented using roles
Layers vs. Facets

Layers depend on their lower Layers and are thus not orthogonal
Roles can be exchanged at run time. So an object can play several roles at a time an can also lose them or gain new (see: Role Object Pattern)
HINT from Tutor: When we prepare for the exam, we should REALLY prepare for the role topic!

Difference between Factory Method and Factory Class:

Same difference as Template Method and Template Method (one delegates, the other doesn't)
Self Adaptive Systems

Reconfigure something at runtime
Typical examples: Embedded systems like robots. When it drives around, it has to have different modes to adapt to the world. Any SAS is based on Template Classes as thus the behavior can be changed. Other possibilities are Strategy or in a perfect world Roles.
How do you compose role models? How do you compose design patterns?

e.g. Observer: Subject<->Observer are the 2 roles
Difference between Strategy/Template Class and Bridge:

The templates can also be altered in a Bridge but not in a Strategy.

There are 3 parts! Learn for all of them (reminder in slides from 27.01.15)! 1st is describing design patterns, 2nd is their interactions and hierarchy

# Past Exams

## DPF Exam WS 2014/2015

Can you explain me how patterns are classified ?

Variability, Extensibility, Glue Patterns
Explain me composite with a class diagram.

What can you say of the differences between static extensibility and dynamic variability ?

How would you construct a role model ?

What is the link between framework hooks and standards design patterns ?

What are the role constraints ?

Given a class diagram. What patterns do you see?

Multi-bridge, \*-bridge, half of Observer.
What problem has multi-bridge?

He has object-schizophrenia problem.
What is facet? How can you implement them?

Facet - independent dimensions. Implement with bridge or multiple inheritance.
Which pattern handle object-schizophrenia How?

ROP. Clients send requests only to core.
Draw ROP(deep and flat)

See lecture about framework extensibility.
What design pattern is implicit in flat ROP

Mediator.
Properties of roles?

Founded - always in collaborations with other, non-rigid.
Which objects from the given class diagram can you implement like role-objects?

Those who need collaboration with other objects.
How does Mixin work for GenVoca pattern? what is the problem with GenVoca compared to ROP?

Mixin in GenVoca plays the same role of role object in ROP. It can only achieve static role/extensibility.
