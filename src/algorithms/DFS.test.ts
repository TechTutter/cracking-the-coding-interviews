import { assertEquals } from "@std/assert";
import { dfsPreOrder, dfsPostOrder } from "./DFS.ts";

interface TestNode {
  id: string;
  children: TestNode[];
}

function getTestNodeChildren(node: TestNode): TestNode[] {
  return node.children || [];
}

Deno.test("generic DFS PreOrder", async (t) => {
  await t.step("should not traverse if startNode is null", () => {
    const visitedNodes: string[] = [];
    dfsPreOrder<TestNode>(null, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes.length, 0);
  });

  await t.step("should traverse a single node", () => {
    const nodeA: TestNode = { id: "A", children: [] };
    const visitedNodes: string[] = [];
    dfsPreOrder(nodeA, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["A"]);
  });

  await t.step("should traverse a simple tree in PreOrder", () => {
    //   A
    //  / \
    // B   C
    const nodeC: TestNode = { id: "C", children: [] };
    const nodeB: TestNode = { id: "B", children: [] };
    const nodeA: TestNode = { id: "A", children: [nodeB, nodeC] };

    const visitedNodes: string[] = [];
    dfsPreOrder(nodeA, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["A", "B", "C"]);
  });

  await t.step("should traverse a complex tree in PreOrder", () => {
    //     A
    //    /|\
    //   B C D
    //  / \   |
    // E   F  G
    // Expected: A, B, E, F, C, D, G
    const nodeE: TestNode = { id: "E", children: [] };
    const nodeF: TestNode = { id: "F", children: [] };
    const nodeG: TestNode = { id: "G", children: [] };
    const nodeB: TestNode = { id: "B", children: [nodeE, nodeF] };
    const nodeC: TestNode = { id: "C", children: [] };
    const nodeD: TestNode = { id: "D", children: [nodeG] };
    const nodeA: TestNode = { id: "A", children: [nodeB, nodeC, nodeD] };

    const visitedNodes: string[] = [];
    dfsPreOrder(nodeA, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["A", "B", "E", "F", "C", "D", "G"]);
  });

  await t.step(
    "should stop PreOrder traversal if callback returns true",
    () => {
      const nodeC: TestNode = { id: "C", children: [] };
      const nodeB: TestNode = { id: "B", children: [nodeC] }; // B has child C
      const nodeA: TestNode = { id: "A", children: [nodeB] };

      const visitedNodes: string[] = [];
      dfsPreOrder(nodeA, getTestNodeChildren, (node) => {
        visitedNodes.push(node.id);
        if (node.id === "B") {
          return true; // Stop after visiting B, C should not be visited
        }
      });
      assertEquals(visitedNodes, ["A", "B"]);
    }
  );
});

Deno.test("generic DFS PostOrder", async (t) => {
  await t.step("should not traverse if startNode is null", () => {
    const visitedNodes: string[] = [];
    dfsPostOrder<TestNode>(null, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes.length, 0);
  });

  await t.step("should traverse a single node", () => {
    const nodeA: TestNode = { id: "A", children: [] };
    const visitedNodes: string[] = [];
    dfsPostOrder(nodeA, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["A"]);
  });

  await t.step("should traverse a simple tree in PostOrder", () => {
    //   A
    //  / \
    // B   C
    // Expected: B, C, A
    const nodeC: TestNode = { id: "C", children: [] };
    const nodeB: TestNode = { id: "B", children: [] };
    const nodeA: TestNode = { id: "A", children: [nodeB, nodeC] };

    const visitedNodes: string[] = [];
    dfsPostOrder(nodeA, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["B", "C", "A"]);
  });

  await t.step("should traverse a complex tree in PostOrder", () => {
    //     A
    //    /|\
    //   B C D
    //  / \   |
    // E   F  G
    // Expected: E, F, B, C, G, D, A
    const nodeE: TestNode = { id: "E", children: [] };
    const nodeF: TestNode = { id: "F", children: [] };
    const nodeG: TestNode = { id: "G", children: [] };
    const nodeB: TestNode = { id: "B", children: [nodeE, nodeF] };
    const nodeC: TestNode = { id: "C", children: [] };
    const nodeD: TestNode = { id: "D", children: [nodeG] };
    const nodeA: TestNode = { id: "A", children: [nodeB, nodeC, nodeD] };

    const visitedNodes: string[] = [];
    dfsPostOrder(nodeA, getTestNodeChildren, (node) => {
      visitedNodes.push(node.id);
    });
    assertEquals(visitedNodes, ["E", "F", "B", "C", "G", "D", "A"]);
  });

  await t.step(
    "should stop PostOrder traversal if callback returns true",
    () => {
      //   A
      //  /
      // B
      //  \
      //   C
      // If we stop at B, C should have been processed, then B. A is not processed.
      // Expected: C, B
      const nodeC: TestNode = { id: "C", children: [] };
      const nodeB: TestNode = { id: "B", children: [nodeC] };
      const nodeA: TestNode = { id: "A", children: [nodeB] };

      const visitedNodes: string[] = [];
      dfsPostOrder(nodeA, getTestNodeChildren, (node) => {
        visitedNodes.push(node.id);
        if (node.id === "B") {
          return true; // Stop when B is processed. C should be in visitedNodes.
        }
      });
      assertEquals(visitedNodes, ["C", "B"]);
    }
  );
});
