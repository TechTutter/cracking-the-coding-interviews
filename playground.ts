import { Stack } from "@data-structures/stack/Stack.ts";
import { Log } from "@utils/logger.ts";

function main() {
  try {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.pop());
  } catch (error) {
    Log.error(error);
  }
}


main()