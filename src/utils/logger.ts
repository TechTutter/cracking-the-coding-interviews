import { isError } from "@utils/isError.ts";

export const Log = {
  error: (error: unknown): void => {
    let errorName: string = "Unknown Error";
    let errorFileName: string = "Unknown File";
    let errorFullPath: string = "Unknown Path";
    let errorLine: number = 0;
    let errorColumn: number = 0;

    if (isError(error)) {
      const stackLines = error.stack?.split("\n") ?? [];
      const locationLine =
        stackLines.findLast((line) => line.includes("at")) ?? "";
      const match =
        locationLine.match(/at .*?\((.*?):\d+:\d+\)/) ||
        locationLine.match(/at (.*?):\d+:\d+/);
      const path = match?.[1] ?? "Unknown File";

      const fileName = path.split("/").pop() ?? "Unknown File";

      const splittedLocationLine = locationLine.split(":");
      const [line, column] = [splittedLocationLine[splittedLocationLine.length - 2], splittedLocationLine[splittedLocationLine.length - 1]];

      errorName = error.name;
      errorFileName = fileName;
      errorFullPath = path;
      errorLine = parseInt(line);
      errorColumn = parseInt(column);

    }

    console.error(`\n${errorName} thrown by ${errorFileName}:${errorLine}:${errorColumn}\n-> ${errorFullPath}\n`);
  },
};
