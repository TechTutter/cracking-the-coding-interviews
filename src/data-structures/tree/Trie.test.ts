import { assertEquals, assert } from "@std/assert";
import { Trie } from "./Trie.ts";

Deno.test("Trie - Basic Operations", () => {
  const trie = new Trie();

  // Test empty trie
  assert(trie.isEmpty());
  assertEquals(trie.size(), 0);
  assert(!trie.search("test"));
  assert(!trie.startsWith("te"));

  // Test insertion
  trie.insert("test");
  assert(!trie.isEmpty());
  assertEquals(trie.size(), 1);
  assert(trie.search("test"));
  assert(trie.startsWith("te"));
  assert(!trie.search("tes"));
  assert(trie.startsWith("tes"));

  // Test multiple words
  trie.insert("testing");
  assertEquals(trie.size(), 2);
  assert(trie.search("testing"));
  assert(trie.startsWith("test"));
  assert(!trie.search("testin"));

  // Test removal
  assert(trie.remove("test"));
  assertEquals(trie.size(), 1);
  assert(!trie.search("test"));
  assert(trie.startsWith("test")); // Still has "testing"
  assert(trie.search("testing"));

  // Test getAllWords
  const words = trie.getAllWords();
  assertEquals(words.length, 1);
  assertEquals(words[0], "testing");
});

Deno.test("Trie - Edge Cases", () => {
  const trie = new Trie();

  // Test empty string
  trie.insert("");
  assert(trie.search(""));
  assert(trie.startsWith(""));
  assertEquals(trie.size(), 1);

  // Test duplicate insertion
  trie.insert("test");
  trie.insert("test");
  assertEquals(trie.size(), 2); // Both words are stored
  assert(trie.search("test"));

  // Test removal of non-existent word
  assert(!trie.remove("nonexistent"));
  assertEquals(trie.size(), 2);

  // Test prefix of existing word
  assert(trie.startsWith("tes"));
  assert(!trie.search("tes"));
});

Deno.test("Trie - Complex Operations", () => {
  const trie = new Trie();
  const words = ["apple", "app", "application", "banana", "band", "bandana"];

  // Insert all words
  for (const word of words) {
    trie.insert(word);
  }
  assertEquals(trie.size(), words.length);

  // Test all words exist
  for (const word of words) {
    assert(trie.search(word), `Word "${word}" should exist`);
  }

  // Test common prefixes
  assert(trie.startsWith("app"));
  assert(trie.startsWith("ban"));
  assert(!trie.startsWith("c"));

  // Test getAllWords
  const allWords = trie.getAllWords();
  assertEquals(allWords.length, words.length);
  for (const word of words) {
    assert(allWords.includes(word), `Word "${word}" should be in getAllWords`);
  }

  // Test removal and reinsertion
  assert(trie.remove("app"));
  assert(!trie.search("app"));
  assert(trie.startsWith("app")); // Still has "apple" and "application"
  trie.insert("app");
  assert(trie.search("app"));
}); 