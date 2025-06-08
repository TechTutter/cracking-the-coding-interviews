import { assertEquals, assertThrows } from "https://deno.land/std@0.220.1/assert/mod.ts";
import { Graph } from './Graph.ts';
import {
  VertexNotFoundError,
  EdgeNotFoundError,
  DuplicateVertexError,
  DuplicateEdgeError
} from '../../models/Errors.ts';

Deno.test("Graph - constructor", async (t) => {
  await t.step("should create an empty undirected graph by default", () => {
    const graph = new Graph();
    assertEquals(graph.getVertexCount(), 0);
    assertEquals(graph.getEdgeCount(), 0);
  });

  await t.step("should create a directed graph when specified", () => {
    const directedGraph = new Graph(true);
    directedGraph.addVertex(1);
    directedGraph.addVertex(2);
    directedGraph.addEdge(1, 2);
    assertEquals(directedGraph.hasEdge(2, 1), false);
  });
});

Deno.test("Graph - addVertex", async (t) => {
  await t.step("should add a vertex successfully", () => {
    const graph = new Graph();
    graph.addVertex(1);
    assertEquals(graph.hasVertex(1), true);
    assertEquals(graph.getVertexCount(), 1);
  });

  await t.step("should throw DuplicateVertexError when adding existing vertex", () => {
    const graph = new Graph();
    graph.addVertex(1);
    assertThrows(() => graph.addVertex(1), DuplicateVertexError);
  });
});

Deno.test("Graph - addEdge", async (t) => {
  await t.step("should add an edge successfully", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(1, 2);
    assertEquals(graph.hasEdge(1, 2), true);
    assertEquals(graph.hasEdge(2, 1), true); // Undirected graph
    assertEquals(graph.getEdgeCount(), 1);
  });

  await t.step("should add a weighted edge", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(1, 2, 5);
    const edges = graph.getEdges(1);
    assertEquals(edges[0].weight, 5);
  });

  await t.step("should throw VertexNotFoundError when adding edge to non-existent vertex", () => {
    const graph = new Graph();
    graph.addVertex(1);
    assertThrows(() => graph.addEdge(1, 3), VertexNotFoundError);
  });

  await t.step("should throw DuplicateEdgeError when adding existing edge", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(1, 2);
    assertThrows(() => graph.addEdge(1, 2), DuplicateEdgeError);
  });
});

Deno.test("Graph - removeVertex", async (t) => {
  await t.step("should remove vertex and its edges", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(1, 2);
    graph.removeVertex(1);
    assertEquals(graph.hasVertex(1), false);
    assertEquals(graph.getVertexCount(), 1);
    assertEquals(graph.getEdgeCount(), 0);
  });

  await t.step("should throw VertexNotFoundError when removing non-existent vertex", () => {
    const graph = new Graph();
    assertThrows(() => graph.removeVertex(3), VertexNotFoundError);
  });
});

Deno.test("Graph - removeEdge", async (t) => {
  await t.step("should remove edge successfully", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(1, 2);
    graph.removeEdge(1, 2);
    assertEquals(graph.hasEdge(1, 2), false);
    assertEquals(graph.hasEdge(2, 1), false);
    assertEquals(graph.getEdgeCount(), 0);
  });

  await t.step("should throw VertexNotFoundError when removing edge with non-existent vertex", () => {
    const graph = new Graph();
    graph.addVertex(1);
    assertThrows(() => graph.removeEdge(1, 3), VertexNotFoundError);
  });

  await t.step("should throw EdgeNotFoundError when removing non-existent edge", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(3);
    assertThrows(() => graph.removeEdge(1, 3), EdgeNotFoundError);
  });
});

Deno.test("Graph - getVertices", async (t) => {
  await t.step("should return all vertices", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    assertEquals(graph.getVertices(), [1, 2]);
  });

  await t.step("should return empty array for empty graph", () => {
    const graph = new Graph();
    assertEquals(graph.getVertices(), []);
  });
});

Deno.test("Graph - getEdges", async (t) => {
  await t.step("should return all edges from a vertex", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(1, 2, 5);
    assertEquals(graph.getEdges(1), [{ to: 2, weight: 5 }]);
  });

  await t.step("should throw VertexNotFoundError when getting edges of non-existent vertex", () => {
    const graph = new Graph();
    assertThrows(() => graph.getEdges(3), VertexNotFoundError);
  });
});

Deno.test("Graph - hasVertex", async (t) => {
  await t.step("should return true for existing vertex", () => {
    const graph = new Graph();
    graph.addVertex(1);
    assertEquals(graph.hasVertex(1), true);
  });

  await t.step("should return false for non-existent vertex", () => {
    const graph = new Graph();
    assertEquals(graph.hasVertex(1), false);
  });
});

Deno.test("Graph - hasEdge", async (t) => {
  await t.step("should return true for existing edge", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addEdge(1, 2);
    assertEquals(graph.hasEdge(1, 2), true);
  });

  await t.step("should return false for non-existent edge", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(3);
    assertEquals(graph.hasEdge(1, 3), false);
  });

  await t.step("should throw VertexNotFoundError when checking edge with non-existent vertex", () => {
    const graph = new Graph();
    assertThrows(() => graph.hasEdge(1, 3), VertexNotFoundError);
  });
});

Deno.test("Graph - getVertexCount", async (t) => {
  await t.step("should return correct vertex count", () => {
    const graph = new Graph();
    assertEquals(graph.getVertexCount(), 0);
    graph.addVertex(1);
    assertEquals(graph.getVertexCount(), 1);
    graph.addVertex(2);
    assertEquals(graph.getVertexCount(), 2);
  });
});

Deno.test("Graph - getEdgeCount", async (t) => {
  await t.step("should return correct edge count for undirected graph", () => {
    const graph = new Graph();
    graph.addVertex(1);
    graph.addVertex(2);
    graph.addVertex(3);
    graph.addEdge(1, 2);
    assertEquals(graph.getEdgeCount(), 1);
    graph.addEdge(2, 3);
    assertEquals(graph.getEdgeCount(), 2);
  });

  await t.step("should return correct edge count for directed graph", () => {
    const directedGraph = new Graph(true);
    directedGraph.addVertex(1);
    directedGraph.addVertex(2);
    directedGraph.addEdge(1, 2);
    assertEquals(directedGraph.getEdgeCount(), 1);
  });
}); 