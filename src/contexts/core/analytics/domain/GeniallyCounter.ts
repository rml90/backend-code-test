import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

export class GeniallyCounter extends AggregateRoot {
  static readonly COUNTER_NAME: string = "genially_created_counter";
  private _id: string;
  private _value: number;
  
  constructor(value: number) {
    super();
    this._id = GeniallyCounter.COUNTER_NAME;
    this._value = value;
  }

  static fromPrimitives(plainData: {value: number}): GeniallyCounter {
    return new GeniallyCounter(plainData.value);
  }

  static initialize(): GeniallyCounter {
    return new GeniallyCounter(0);
  }

  increment(): void {
    this._value = this._value + 1;
  }

  toPrimitives(): Record<string, any> {
    return {
      id: this._id,
      value: this._value
    };
  }  

  get id(): string {
    return this._id;
  }

  get value(): number {
    return this._value;
  }
}