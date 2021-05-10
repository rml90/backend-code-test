import { GeniallyNameEmpty } from "./GeniallyNameEmpty";
import { GeniallyNameLengthInvalid } from "./GeniallyNameLengthInvalid";

export class GeniallyName {

  constructor(public readonly value: string) {
    if(value.length == 0) {
      throw new GeniallyNameEmpty();
    }
    
    if(value.length < 3) {
      throw new GeniallyNameLengthInvalid(value);
    }
    
    if(value.length > 20) {
      throw new GeniallyNameLengthInvalid(value);
    }
  }
}