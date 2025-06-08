import { assertEquals, assertThrows, assert } from "@std/assert";
import { OutOfBoundsError } from "@models/Errors.ts";
import { BitSet } from "@data-structures/bitset/BitSet.ts";

Deno.test("BitSet", async (t) => {
  await t.step("constructor", () => {
    const size = 64;
    const bs = new BitSet(size);
    for (let i = 0; i < size; i++) {
      assertEquals(bs.get(i), false, `Bit ${i} should be initially false`);
    }
  });

  await t.step("invalid size", () => {
    assertThrows(
      () => new BitSet(0),
      Error,
      "Number of bits must be positive."
    );
    assertThrows(
      () => new BitSet(-10),
      Error,
      "Number of bits must be positive."
    );
  });

  await t.step("set and get within one word", () => {
    const bs = new BitSet(32);
    bs.set(0);
    bs.set(15);
    bs.set(31);

    assertEquals(bs.get(0), true);
    assertEquals(bs.get(1), false);
    assertEquals(bs.get(15), true);
    assertEquals(bs.get(30), false);
    assertEquals(bs.get(31), true);
  });

  await t.step("set and get across multiple words", () => {
    const bs = new BitSet(70); // Needs 3 words (32, 32, 6)
    bs.set(5);
    bs.set(32); // First bit of the second word
    bs.set(63); // Last bit of the second word
    bs.set(69); // Last bit of the BitSet (in the third word)

    assertEquals(bs.get(5), true);
    assertEquals(bs.get(6), false);
    assertEquals(bs.get(31), false);
    assertEquals(bs.get(32), true);
    assertEquals(bs.get(33), false);
    assertEquals(bs.get(63), true);
    assertEquals(bs.get(64), false); // First bit of third word, not set
    assertEquals(bs.get(69), true);
  });

  await t.step("clear", () => {
    const bs = new BitSet(40);
    bs.set(10);
    bs.set(35);

    assertEquals(bs.get(10), true);
    assertEquals(bs.get(35), true);

    bs.clear(10);
    assertEquals(bs.get(10), false);
    assertEquals(bs.get(35), true); // Should still be true

    bs.clear(35);
    assertEquals(bs.get(35), false);

    bs.clear(0); // Clearing an already clear bit
    assertEquals(bs.get(0), false);
  });

  await t.step("out of bounds access", () => {
    const bs = new BitSet(16);
    assertThrows(
      () => bs.set(-1),
      OutOfBoundsError,
      "Bit index -1 is out of bounds (0-15)."
    );
    assertThrows(
      () => bs.get(16),
      OutOfBoundsError,
      "Bit index 16 is out of bounds (0-15)."
    );
    assertThrows(
      () => bs.clear(100),
      OutOfBoundsError,
      "Bit index 100 is out of bounds (0-15)."
    );
  });

  await t.step("idempotency of set and clear", () => {
    const bs = new BitSet(8);
    bs.set(3);
    assert(bs.get(3));
    bs.set(3); // Set again
    assert(bs.get(3));

    bs.clear(3);
    assert(!bs.get(3));
    bs.clear(3); // Clear again
    assert(!bs.get(3));
  });
});
