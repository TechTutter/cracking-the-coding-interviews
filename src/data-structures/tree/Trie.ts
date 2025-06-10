export class TrieNode {
  public children: Map<string, TrieNode>;
  public isEndOfWord: boolean;
  public value: string | null;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.value = null;
  }
}

export class Trie {
  private root: TrieNode;
  private _size: number;

  constructor() {
    this.root = new TrieNode();
    this._size = 0;
  }

  insert(word: string): void {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
    }

    if (!current.isEndOfWord) {
      current.isEndOfWord = true;
      current.value = word;
      this._size++;
    }
  }

  remove(word: string): boolean {
    const node = this.findNode(word);
    if (!node || !node.isEndOfWord) {
      return false;
    }

    node.isEndOfWord = false;
    node.value = null;
    this._size--;
    return true;
  }

  /**
   * Searches for a word in the trie
   * @param word - The word to search for
   * @returns boolean indicating if the word exists
   * Time Complexity: O(m) where m is the length of the word
   * Space Complexity: O(1)
   */
  search(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEndOfWord;
  }

  /**
   * Checks if any word in the trie starts with the given prefix
   * @param prefix - The prefix to check
   * @returns boolean indicating if any word starts with the prefix
   * Time Complexity: O(m) where m is the length of the prefix
   * Space Complexity: O(1)
   */
  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }



  getAllWords(): string[] {
    const words: string[] = [];
    this.collectWords(this.root, words);
    return words;
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  private findNode(word: string): TrieNode | null {
    let current = this.root;

    for (const char of word) {
      if (!current.children.has(char)) {
        return null;
      }
      current = current.children.get(char)!;
    }

    return current;
  }

  private collectWords(node: TrieNode, words: string[]): void {
    if (node.isEndOfWord && node.value) {
      words.push(node.value);
    }

    for (const child of node.children.values()) {
      this.collectWords(child, words);
    }
  }
} 