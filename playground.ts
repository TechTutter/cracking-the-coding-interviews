import { Log } from "@utils/logger.ts";
import { Trie } from "@data-structures/tree/Trie.ts";

function main() {
  console.log("Running...");
  try {
    /* eslint-disable-next-line*/

    const trie = new Trie();
    trie.insert("hello");
    trie.insert("world");
    trie.insert("hi");
    console.log(trie.startsWith("he"));
    console.log(trie.search("hello"));
    console.log(trie.size());

  } catch (error) {
    Log.error(error);
  }
}

main();
