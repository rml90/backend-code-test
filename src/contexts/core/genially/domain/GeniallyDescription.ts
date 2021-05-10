import { GeniallyDescriptionTooLong } from "./GeniallyDescriptionTooLong";

export class GeniallyDescription {
  constructor(public readonly value: string) {
    if(value.length > 125) {
      throw new GeniallyDescriptionTooLong(value);
    }
  }
}