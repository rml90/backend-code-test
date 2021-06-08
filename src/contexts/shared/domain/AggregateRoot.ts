export abstract class AggregateRoot {
  abstract toPrimitives(): Record<string, any>;
}
