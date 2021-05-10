export class GeniallyDescriptionTooLong extends Error {
  constructor(description: string) {
    super([
        `Genially description too long (${description.length} characters)`,
        "it is limited to 125 characters",
    ].join(" "));
  }
}