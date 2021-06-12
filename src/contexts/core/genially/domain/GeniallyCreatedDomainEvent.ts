import { DomainEvent } from "../../../shared/domain/DomainEvent";

export class GeniallyCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "genially.created";
  constructor(aggregateId: string, ocurredOn?: Date) {
    super(GeniallyCreatedDomainEvent.EVENT_NAME, aggregateId, ocurredOn);
  }

  toPrimitives(): Record<string, any> {
    return {
      eventName: this.eventName,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
    };
  }

}