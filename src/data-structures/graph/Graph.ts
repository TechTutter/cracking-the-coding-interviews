import {
  VertexNotFoundError,
  EdgeNotFoundError,
  DuplicateVertexError,
  DuplicateEdgeError
} from '../../models/Errors.ts';

type Vertex = string | number;
type Edge = { to: Vertex; weight?: number };

export class Graph {
  private adjacencyList: Map<Vertex, Edge[]>; // can also be a set of edges
  private isDirected: boolean;

  constructor(isDirected: boolean = false) {
    this.adjacencyList = new Map();
    this.isDirected = isDirected;
  }

  /**
   * Adds a vertex to the graph
   * @throws {DuplicateVertexError} if vertex already exists
   */
  addVertex(vertex: Vertex): void {
    if (this.adjacencyList.has(vertex)) {
      throw new DuplicateVertexError(vertex);
    }
    this.adjacencyList.set(vertex, []);
  }

  /**
   * Adds an edge between two vertices
   * @throws {VertexNotFoundError} if either vertex doesn't exist
   * @throws {DuplicateEdgeError} if edge already exists
   */
  addEdge(from: Vertex, to: Vertex, weight?: number): void {
    if (!this.adjacencyList.has(from)) {
      throw new VertexNotFoundError(from);
    }
    if (!this.adjacencyList.has(to)) {
      throw new VertexNotFoundError(to);
    }

    const edges = this.adjacencyList.get(from)!;
    if (edges.some(edge => edge.to === to)) {
      throw new DuplicateEdgeError(from, to);
    }

    edges.push({ to, weight });

    if (!this.isDirected) {
      const reverseEdges = this.adjacencyList.get(to)!;
      reverseEdges.push({ to: from, weight });
    }
  }

  /**
   * Removes a vertex and all its edges
   * @throws {VertexNotFoundError} if vertex doesn't exist
   */
  removeVertex(vertex: Vertex): void {
    if (!this.adjacencyList.has(vertex)) {
      throw new VertexNotFoundError(vertex);
    }

    // Remove all edges pointing to this vertex
    for (const [v, edges] of this.adjacencyList.entries()) {
      this.adjacencyList.set(
        v,
        edges.filter(edge => edge.to !== vertex)
      );
    }

    this.adjacencyList.delete(vertex);
  }

  /**
   * Removes an edge between two vertices
   * @throws {VertexNotFoundError} if either vertex doesn't exist
   * @throws {EdgeNotFoundError} if edge doesn't exist
   */
  removeEdge(from: Vertex, to: Vertex): void {
    if (!this.adjacencyList.has(from)) {
      throw new VertexNotFoundError(from);
    }
    if (!this.adjacencyList.has(to)) {
      throw new VertexNotFoundError(to);
    }

    const edges = this.adjacencyList.get(from)!;
    const edgeIndex = edges.findIndex(edge => edge.to === to);

    if (edgeIndex === -1) {
      throw new EdgeNotFoundError(from, to);
    }

    edges.splice(edgeIndex, 1);

    if (!this.isDirected) {
      const reverseEdges = this.adjacencyList.get(to)!;
      const reverseEdgeIndex = reverseEdges.findIndex(edge => edge.to === from);
      reverseEdges.splice(reverseEdgeIndex, 1);
    }
  }

  /**
   * Returns all vertices in the graph
   */
  getVertices(): Vertex[] {
    return Array.from(this.adjacencyList.keys());
  }

  /**
   * Returns all edges from a vertex
   * @throws {VertexNotFoundError} if vertex doesn't exist
   */
  getEdges(vertex: Vertex): Edge[] {
    if (!this.adjacencyList.has(vertex)) {
      throw new VertexNotFoundError(vertex);
    }
    return [...this.adjacencyList.get(vertex)!];
  }

  /**
   * Returns true if the graph has the vertex
   */
  hasVertex(vertex: Vertex): boolean {
    return this.adjacencyList.has(vertex);
  }

  /**
   * Returns true if the graph has the edge
   * @throws {VertexNotFoundError} if either vertex doesn't exist
   */
  hasEdge(from: Vertex, to: Vertex): boolean {
    if (!this.adjacencyList.has(from)) {
      throw new VertexNotFoundError(from);
    }
    if (!this.adjacencyList.has(to)) {
      throw new VertexNotFoundError(to);
    }
    return this.adjacencyList.get(from)!.some(edge => edge.to === to);
  }

  /**
   * Returns the number of vertices in the graph
   */
  getVertexCount(): number {
    return this.adjacencyList.size;
  }

  /**
   * Returns the number of edges in the graph
   */
  getEdgeCount(): number {
    let count = 0;
    for (const edges of this.adjacencyList.values()) {
      count += edges.length;
    }
    return this.isDirected ? count : count / 2;
  }
} 