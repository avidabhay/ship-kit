// type Example = Record<"project" | "phase", string | number
type Example = {
    project: string | number;
    phase: string | number;
};

// Check both keys and their values, while keeping project as string and phase as number.
export const example = {
    project: "ship-kit",
    phase: 0,
} satisfies Example;
