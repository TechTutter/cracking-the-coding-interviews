import { Log } from "@utils/logger.ts";
import { BitSet } from "@data-structures/bitset/BitSet.ts";

function main() {
  try {
    /* eslint-disable-next-line*/
    const mySet = new BitSet(16);
    mySet.set(1);
    mySet.set(2);
  } catch (error) {
    Log.error(error);
  }
}

main();
