import { Log } from "@utils/logger.ts";
import { BitSet } from "@data-structures/bitset/BitSet.ts";

function main() {
  console.log("Running...");
  try {
    /* eslint-disable-next-line*/
    const mySet = new BitSet(16);

    mySet.set(1);
    console.log(mySet.get(1), mySet.get(2));

  } catch (error) {
    Log.error(error);
  }
}

main();
