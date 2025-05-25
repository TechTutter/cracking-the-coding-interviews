import { BinaryTree, BinaryTreeNode } from "./BinaryTree.ts";

export class BST<T> extends BinaryTree<T> {
  insert(value: T): BinaryTreeNode<T> {
    const newNode = new BinaryTreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return newNode;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          newNode.parent = current;
          return newNode;
        }
        current = current.left;
      } else if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          newNode.parent = current;
          return newNode;
        }
        current = current.right;
      } else {
        // Value already exists, or handle duplicates (e.g., insert to right)
        // For simplicity, let's assume duplicates are allowed and go to the right
        if (!current.right) {
          current.right = newNode;
          newNode.parent = current;
          return newNode;
        }
        current = current.right; // Continue search for a spot in the right subtree
      }
    }
  }

  override find(
    value: T,
    startNode: BinaryTreeNode<T> | null = this.root
  ): BinaryTreeNode<T> | null {
    let current = startNode;
    while (current) {
      if (value === current.value) {
        return current;
      } else if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  // Rimuove un nodo con un valore specifico.
  remove(value: T): boolean {
    const nodeToRemove = this.find(value);
    if (!nodeToRemove) {
      return false; // Valore non trovato
    }

    const parent = nodeToRemove.parent;

    // Caso 1: Il nodo da rimuovere è una foglia (non ha figli)
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (!parent) {
        // È il nodo radice
        this.root = null;
      } else if (parent.left === nodeToRemove) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
    // Caso 2: Il nodo da rimuovere ha un solo figlio
    else if (!nodeToRemove.left || !nodeToRemove.right) {
      const child = nodeToRemove.left || nodeToRemove.right;
      if (!parent) {
        // È il nodo radice
        this.root = child;
        if (child) child.parent = null;
      } else if (parent.left === nodeToRemove) {
        parent.left = child;
        if (child) child.parent = parent;
      } else {
        parent.right = child;
        if (child) child.parent = parent;
      }
    }
    // Caso 3: Il nodo da rimuovere ha due figli
    else {
      // Trova il successore in-order (il più piccolo nel sottoalbero destro)
      const successor = this.findMin(nodeToRemove.right!); // right is guaranteed by two-child case
      // Copia il valore del successore nel nodo da rimuovere
      nodeToRemove.value = successor.value;
      // Rimuovi il successore (che avrà al massimo un figlio destro)
      // Questo è un trucco: invece di chiamare this.remove(successor.value) che rifarebbe la ricerca,
      // sappiamo che il successore è il minimo del sottoalbero destro, quindi non ha un figlio sinistro.
      // Possiamo "bypassarlo" o rimuoverlo direttamente.
      // Per semplicità, deleghiamo la rimozione del successore (che ora è un caso più semplice)
      // a una chiamata ricorsiva simulata o a una logica di rimozione diretta.
      // Qui, per evitare una chiamata ricorsiva completa a this.remove, gestiamo la rimozione del successore.
      const successorParent = successor.parent!; // Successor must have a parent unless it's nodeToRemove.right itself
      if (successorParent.left === successor) {
        successorParent.left = successor.right; // Successor.right could be null
        if (successor.right) successor.right.parent = successorParent;
      } else {
        // successor must be successorParent.right
        successorParent.right = successor.right;
        if (successor.right) successor.right.parent = successorParent;
      }
    }
    return true;
  }

  // Trova il nodo con il valore minimo in un sottoalbero (usato per la rimozione).
  findMin(node: BinaryTreeNode<T> | null = this.root): BinaryTreeNode<T> {
    if (!node) {
      throw new Error("Cannot find minimum in an empty tree or subtree.");
    }
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  // Trova il nodo con il valore massimo in un sottoalbero.
  findMax(node: BinaryTreeNode<T> | null = this.root): BinaryTreeNode<T> {
    if (!node) {
      throw new Error("Cannot find maximum in an empty tree or subtree.");
    }
    let current = node;
    while (current.right) {
      current = current.right;
    }
    return current;
  }
}
