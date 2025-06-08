# Table of Contents

- [Setup Guide](#setup-guide)
- [Introduction](#introduction)
- [Data Structures](#data-structures)
- [ADTs](#adts)

# Setup Guide

The easiest way to run the project is by using Deno. Follow the setup guide at [docs.deno.com](https://docs.deno.com/runtime/)

# Introduction

> **A data structure is a way of organizing data so that it can be used effectively**.

> An **Abstract Data Type** - ADT - **provides only the interface to which a data structure must adhere**, without giving any specific details about how something should be implemented.

An example of an abstraction is a "List", which might be implemented with a Vector, or a Linked list.

**The core data structures**, used on algorithms such as A\*, or upon which all ADTs are implemented, **are the following**:

- [**Vector**](#vector)
- [**StringBuilder**](#stringbuilder)
- [**Bitset**](#bitset) - a.k.a. binary set, bit/binary vector
- **Disjoint set / Union-Find** - for algorithms e.g. Kruskal
- [**Linked List**](#linked-list)
  - [**Doubly Linked List**](#doubly-linked-list)
- **Circular Buffer**
- [**Hash Table**](#hash-table) - core structure used to implement maps and dictionaries.
- [**Tree**](#tree)
  - [**Binary Tree**](#binary-tree)
  - [**Binary Search Tree (BST)**](#binary-search-tree-bst)
  - **Heap**
  - **Trie**
  - **AVL Tree**
  - **Segment Tree / Fenwick Tree (BIT)** - for efficient range queries
- [**Graph**](#graph)

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

Core Concepts:

- **Recursion**
- **OOP notions**

Core Algorithms:

- MergeSort
- QuickSort
- Binary Search

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

## BitSet

A BitSet (also known as a bit array, bit vector, or bit string) is an array data structure that compactly stores bits. It can be used to implement a simple set data structure for a dense universe of small integers. Each bit corresponds to a boolean value (true/false or 1/0).

**Implementation** - See [BitSet.ts](./src/data-structures/bitset/BitSet.ts)

**Use Cases**

- Representing a set of small integers or flags efficiently.
- Tracking presence/absence of items from a known, fixed-size domain (e.g., character sets, available resources).
- Implementing Bloom filters (probabilistic data structure).
- Optimizations in algorithms where many boolean flags are needed (e.g., marking visited nodes in graph traversal for dense graphs with integer-labeled nodes).
- Low-level programming, hardware register manipulation.

**Complexity**

| Operation    | Time | Note                                |
| ------------ | ---- | ----------------------------------- |
| `set(index)` | O(1) | Direct bitwise operation on a word. |
| `get(index)` | O(1) | Direct bitwise operation on a word. |

## Tree

**Implementation** - See [Tree.ts](./src/data-structures/tree/Tree.ts)

**Use Cases**

- Representing hierarchical data:
  - File systems (directories and files)
  - Organization charts
  - Document Object Model (DOM) in web pages
- Decision trees in machine learning.
- Representing family trees or taxonomies.

**Complexity** (for the generic Tree implementation provided)

| Operation                      | Time | Space | Note                                                              |
| ------------------------------ | ---- | ----- | ----------------------------------------------------------------- |
| `Tree.add(value, parentValue)` | O(N) | O(1)  | Involves finding the parent node (O(N)) then adding child (O(1)). |
| `TreeNode.addChild(value)`     | O(1) | O(1)  | Adds a child to a specific node.                                  |
| `Tree.find(value)`             | O(N) | O(N)  | Traverses the tree (BFS) to find the node. Space for BFS queue.   |

> N = Number of nodes in the tree.
> H = Height of the tree.
> The `add` operation's complexity is dominated by the `find` operation to locate the parent.

### Binary Tree

A tree data structure where each node has at most two children, referred to as the left child and the right child. Unlike Binary Search Trees, Binary Trees do not have any specific ordering of elements.

**Implementation** - See [BinaryTree.ts](./src/data-structures/tree/BinaryTree.ts)

**Use Cases**

- Foundation for more specialized tree structures like Binary Search Trees, Heaps, and AVL trees.
- Representing hierarchical structures with a maximum of two branches per node, e.g., expression trees (for mathematical expressions).
- Basic decision trees.

**Complexity** (for the generic Binary Tree implementation provided)

| Operation       | Time | Space | Note                                                                |
| --------------- | ---- | ----- | ------------------------------------------------------------------- |
| `find(value)`   | O(N) | O(W)  | Traverses the tree (BFS) to find a node. W = max width of the tree. |
| `bfs(callback)` | O(N) | O(W)  | Visits all N nodes. W = max width of the tree (for BFS queue).      |
| `dfs(callback)` | O(N) | O(H)  | Visits all N nodes. H = height of the tree (for recursion stack).   |

> N = Number of nodes in the tree.
> H = Height of the tree.
> W = Maximum width of the tree.
> Note: Generic insertion/deletion methods are not typically part of a base Binary Tree class without further specification (e.g., how/where to insert). Nodes are usually linked manually or by specific tree-building algorithms.

### Binary Search Tree (BST)

A binary tree with a specific ordering property: for any given node, all values in its left subtree are less than the node's value, and all values in its right subtree are greater than the node's value. This property allows for efficient searching, insertion, and deletion. (This implementation assumes duplicates, if allowed, are inserted into the right subtree).

**Implementation** - See [BST.ts](./src/data-structures/tree/BST.ts)

**Use Cases**

- Efficient searching, insertion, and deletion of items when data needs to be ordered.
- Implementing dynamic sets and lookup tables (e.g., the underlying structure for `Map` or `Set` ADTs where element order is important).
- Used in database indexing.

**Complexity**

| Operation                 | Average Time | Worst Time | Space (Avg/Worst) | Note                                                               |
| ------------------------- | ------------ | ---------- | ----------------- | ------------------------------------------------------------------ |
| `insert(value)`           | O(log N)     | O(N)       | O(H)              | H is height; O(log N) for balanced, O(N) for skewed.               |
| `find(value)`             | O(log N)     | O(N)       | O(H)              |                                                                    |
| `remove(value)`           | O(log N)     | O(N)       | O(H)              | Involves finding the node and its successor/predecessor.           |
| `findMin()` / `findMax()` | O(log N)     | O(N)       | O(H)              | Traverses to the leftmost/rightmost node.                          |
| `bfs(callback)`           | O(N)         | O(N)       | O(W) / O(N)       | W = max width. Worst case space for skewed tree is O(N) for queue. |
| `dfs(callback)`           | O(N)         | O(N)       | O(H)              |                                                                    |

> N = Number of nodes in the tree.
> H = Height of the tree. Average H is O(log N) for a balanced tree, worst H is O(N) for a skewed tree.
> W = Maximum width of the tree.
> **Average case** complexities assume the tree is reasonably balanced.
> **Worst case** complexities occur when the tree becomes skewed (resembling a linked list).

## Graph

A graph is a non-linear data structure consisting of vertices (nodes) connected by edges. This implementation uses an adjacency list representation, which is efficient for sparse graphs and provides good performance for most operations.

**Implementation** - See [Graph.ts](./src/data-structures/graph/Graph.ts)

**Use Cases**

- Social networks (vertices as users, edges as connections)
- Network routing (vertices as routers, edges as connections)

**Complexity**

| Operation      | Time   | Space | Note                                |
| -------------- | ------ | ----- | ----------------------------------- |
| `addVertex(v)` | O(1)   | O(1)  | Direct map insertion                |
| `addEdge(v,w)` | O(1)   | O(1)  | Direct list append                  |
| `removeVertex` | O(V+E) | O(1)  | V = vertices, E = edges to remove   |
| `removeEdge`   | O(E)   | O(1)  | E = edges to scan in adjacency list |
| `hasVertex`    | O(1)   | O(1)  | Direct map lookup                   |
| `hasEdge`      | O(E)   | O(1)  | E = edges to scan in adjacency list |
| `getVertices`  | O(V)   | O(V)  | V = number of vertices              |
| `getEdges`     | O(1)   | O(E)  | E = number of edges for vertex      |

> The implementation supports both directed and undirected graphs, with weighted edges optional.

## Circular Buffer

A circular buffer (also known as a ring buffer) is a fixed-size buffer that wraps around when it reaches its capacity. It's particularly useful for implementing queues with a fixed size and for handling data streams where old data can be overwritten.

**Implementation** - See [CircularBuffer.ts](./src/data-structures/circular-buffer/CircularBuffer.ts)

**Use Cases**

- Implementing Dequeue ADT
- Audio/Video streaming buffers
- Network packet buffering

**Complexity**

| Operation      | Time | Space | Note                                   |
| -------------- | ---- | ----- | -------------------------------------- |
| `enqueue(val)` | O(1) | O(1)  | Constant time insertion                |
| `dequeue()`    | O(1) | O(1)  | Constant time removal                  |
| `peek()`       | O(1) | O(1)  | Constant time access to oldest element |

> The implementation uses a fixed-size array with head and tail pointers to achieve O(1) operations for enqueue and dequeue.

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
