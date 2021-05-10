export class GeniallyNameEmpty extends Error {
  constructor() {
    super("Genially cannot have an empty name");
  }
}