import { IncrementGeniallyCounterService } from "./IncrementGeniallyCounterService";
import { GeniallyCreatedDomainEvent } from "./../../genially/domain/GeniallyCreatedDomainEvent";
import { DomainEventSubscriber } from "./../../../shared/domain/DomainEventSubscriber";
import { DomainEventClass } from "./../../../shared/domain/DomainEvent";

export class IncrementGeniallyCounterOnGeniallyCreated implements DomainEventSubscriber<GeniallyCreatedDomainEvent> {
  constructor(
    private incrementGeniallyCounterService: IncrementGeniallyCounterService
  ) {}
  
  subscribedTo(): DomainEventClass[] {
    return [
      GeniallyCreatedDomainEvent,
    ];
  }

  async on(domainEvent: GeniallyCreatedDomainEvent): Promise<void> {
    await this.incrementGeniallyCounterService.run();
  }
}