import { assertEquals } from "@std/assert";
import { bfs } from "./BFS.ts";

interface TestNode {
  id: string;
  children: TestNode[];
}

function getTestNodeChildren(node: TestNode): TestNode[] {
  return node.children || [];
}

Deno.test("generic BFS", async (t) => {
  await t.step("should not traverse if startNode is null", () => {
    const visitedNodes: string[] = [];
    bfs<TestNode>(null, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes.length, 0);
  });

  await t.step("should traverse a single node", () => {
    const nodeA: TestNode = { id: "A", children: [] };
    const visitedNodes: string[] = [];
    bfs(nodeA, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["A"]);
  });

  await t.step("should traverse a simple tree in BFS order", () => {
    //   A
    //  / \
    // B   C
    const nodeC: TestNode = { id: "C", children: [] };
    const nodeB: TestNode = { id: "B", children: [] };
    const nodeA: TestNode = { id: "A", children: [nodeB, nodeC] };

    const visitedNodes: string[] = [];
    bfs(nodeA, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["A", "B", "C"]);
  });

  await t.step("should traverse a more complex tree in BFS order", () => {
    //     A
    //    /|\
    //   B C D
    //  / \   |
    // E   F  G
    const nodeE: TestNode = { id: "E", children: [] };
    const nodeF: TestNode = { id: "F", children: [] };
    const nodeG: TestNode = { id: "G", children: [] };
    const nodeB: TestNode = { id: "B", children: [nodeE, nodeF] };
    const nodeC: TestNode = { id: "C", children: [] };
    const nodeD: TestNode = { id: "D", children: [nodeG] };
    const nodeA: TestNode = { id: "A", children: [nodeB, nodeC, nodeD] };

    const visitedNodes: string[] = [];
    bfs(nodeA, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["A", "B", "C", "D", "E", "F", "G"]);
  });

  await t.step("should stop traversal if callback returns true", () => {
    const nodeC: TestNode = { id: "C", children: [] };
    const nodeB: TestNode = { id: "B", children: [] };
    const nodeA: TestNode = { id: "A", children: [nodeB, nodeC] };

    const visitedNodes: string[] = [];
    bfs(nodeA, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
      if (node.id === "B") {
        return true; // Stop after visiting B
      }
    });
    assertEquals(visitedNodes, ["A", "B"]);
  });

  await t.step("should handle nodes with no children correctly", () => {
    const nodeA: TestNode = { id: "A", children: [] };
    const getChildrenEmpty = (_node: TestNode) => [];
    const visitedNodes: string[] = [];
    bfs(nodeA, getChildrenEmpty, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["A"]);

    const getChildrenNull = (_node: TestNode) => null;
    visitedNodes.length = 0; // Clear array
    bfs(nodeA, getChildrenNull, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["A"]);
  });
});
