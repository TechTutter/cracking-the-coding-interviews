# Table of Contents

- [Setup Guide](#setup-guide)
- [Data Structures](#data-structures)
- [ADTs](#adts)

# Setup Guide

The easiest way to run the project is by using Deno. Follow the setup guide at [docs.deno.com](https://docs.deno.com/runtime/)

# Data Structures and ADTs

> **A data structure is a way of organizing data so that it can be used effectively**. An **Abstract Data Type** - ADT - **provides only the interface to which a data structure must adhere**, without giving any specific details about how something should be implemented.

An example of an abstraction is a "List", which might be implemented with a Vector, or a Linked list.

**The core data structures**, used on algorithms such as A\*, or upon which all ADTs are implemented, **are the following**:

- [**Vector**](#vector)
- [**StringBuilder**](#stringbuilder)
- **Bitset** - a.k.a. binary set, bit/binary vector
- **Disjoint set / Union-Find** - for algorithms e.g. Kruskal
- [**Linked List**](#linked-list)
  - [**Doubly Linked List**](#doubly-linked-list)
- **Circular Buffer**
- [**Hash Table**](#hash-table) - core structure used to implement maps and dictionaries.
- **Trees**
  - **Binary Tree**
  - **Binary Search Tree**
  - **Heap**
  - **Trie**
  - **AVL Tree**
  - **Segment Tree / Fenwick Tree (BIT)** - for efficient range queries
- **Graph**

**The core ADTs for a SWE role** built on top of these data structure **are the following:**

- **List**
  - **Stack (LIFO)** - with Vector / Linked List
  - **Queue (FIFO)** - with Vector / Linked List
  - **Priority Queue (Priority Based)** - with a Heap
  - **Deque** - with Linked List / Circular Buffer
- **Set** - with Hash Table / Bitset
- **Multiset / Bag** - With BST
- **Map / Dictionary** - with Hash Table
- **TreeMap / Ordered Map**

# Data Structures

## Vector

A dynamic array that resizes itself automatically when capacity is exceeded. Constant-time access by index, amortized constant-time insertion at the end.

**Implementation** - See [Vector.ts](./src/data-structures/vector/Vector.ts)

**Use Cases**

- Core data structure used to build many other data structures / ADTs.
- Compact storage of data for dynamic collection of items.

**Complexity**

| Operation   | Time   | Space | Note                     |
| ----------- | ------ | ----- | ------------------------ |
| `get(i)`    | O(1)   | O(1)  | Direct index access      |
| `push(val)` | O(1)\* | O(n)  | Amortized, resize = O(n) |
| `pop()`     | O(1)   | O(1)  | Remove last element      |
| `resize()`  | O(n)   | O(n)  | Doubling capacity        |

## StringBuilder

A mutable string accumulator that allows efficient construction of strings through chained appends. Avoids repeated string allocations by storing chunks internally and joining them on demand.

**Implementation** See [StringBuilder.ts](./src/data-structures//string-builder/StringBuilder.ts)

**Use Cases**

- Efficient string concatenation in loops or recursive operations.
- Replaces repeated `+=` with amortized O(1) appends.
- Useful for code generation, logging, or building large strings lazily.

**Complexity**

| Operation     | Time | Space | Note                                      |
| ------------- | ---- | ----- | ----------------------------------------- |
| `append(str)` | O(1) | O(1)  | Pushes to internal array                  |
| `toString()`  | O(n) | O(n)  | Join all parts; cached for repeated calls |
| `length`      | O(1) | O(1)  | Cached from `toString()`                  |

> `toString()` uses a cached result to avoid recomputing joins unless mutated.

## Linked List

**Implementation** – See [LinkedList.ts](./src/data-structures/linked-list/LinkedList.ts)

**Use Cases**

- Queue-like behavior with fast head/tail insertion
- When frequent insertion/removal is needed without costly reallocation
- Efficient list building from streamed or unknown-sized inputs

**Complexity**

| Operation     | Time | Note                                 |
| ------------- | ---- | ------------------------------------ |
| `append(val)` | O(1) | Tail reference enables constant push |
| `get(index)`  | O(n) | Traversal required                   |
| `remove(val)` | O(n) | Scans list to find and unlink node   |

> Optimized for mutation, not indexed access. Use arrays if random access is primary.

### Doubly Linked List

A doubly linked list supports bi-directional traversal and efficient insert/remove operations from both ends. Each node holds references to both next and previous nodes.

**Implementation** – See [DoublyLinkedList.ts](./src/data-structures/linked-list/DoublyLinkedList.ts)

**Use Cases**

- Deques (double-ended queues)
- Browser history navigation (back/forward)
- LRU caches (used with hash map)
- When frequent insertions/removals from both ends are needed

**Complexity**

| Operation     | Time | Note                                           |
| ------------- | ---- | ---------------------------------------------- |
| `append(val)` | O(1) |                                                |
| `get(index)`  | O(n) | Traverses from head or tail (whichever closer) |
| `remove(val)` | O(n) | No need to track previous manually             |

## Hash Table

A hash table maps keys to values using a hash function and handles collisions via separate chaining. Provides near-constant time operations under ideal hash distribution.

**Implementation** – See [HashTable.ts](./src/data-structures/hash-table/HashTable.ts)

**Use Cases**

- Fast key-value storage (e.g., maps, symbol tables)
- Counting frequency (histograms, word counts)
- Caching and lookup tables
- Indexing for search/filter operations

**Complexity**

| Operation       | Time   | Note                             |
| --------------- | ------ | -------------------------------- |
| `set(key, val)` | O(1)\* | Amortized, depends on collisions |
| `get(key)`      | O(1)\* | Same as above                    |
| `remove(key)`   | O(1)\* | Needs search inside bucket       |

> \* Worst-case time is O(n) if many keys collide in same bucket. A good hash function keeps it close to O(1).

# ADTs

## Stack

A stack is a _LIFO queue_ with two primary operations, push and pop.

**Implementation** - Array Based Implementation. See [Stack.ts](./src/data-structures/stack/Stack.ts)

**Use Cases**

- To handle any LIFO - last in first out - scenario.
  - Brackets validation. Given an array of brackets (e.g [[{}]()]), every time you encounter an open bracket you push it to the stack, and when you encounter a closing one you pop the stack and check if the two values match. If it does not match, or you reach the end of the array of brackets with a non-empty stack, then the sequence is not valid.
  - CallStack of recursive methods - push an entry for every iteration of the function, and pop when it's done.
  - UNDO mechanism of text editors - push on change, pop on "undo".

**Complexity**

- Push - O(1)
- Pop - O(1)
- Peek - O(1)
- Search - O(1)
