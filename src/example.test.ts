import { expect, test } from "vitest";
import { example } from "./example.ts";

test("keeps the specific property types after satisfies checks the shape", () => {
    // A plain `const example: Example` annotation would require narrowing first.
    expect(example.project.toUpperCase()).toBe("SHIP-KIT");
    expect(example.phase.toFixed(1)).toBe("0.0");
});
