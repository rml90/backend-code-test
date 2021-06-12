import { DomainEventSubscriber } from "./../../../../../../../src/contexts/shared/domain/DomainEventSubscriber";
import { EventBus } from "./../../../../../../../src/contexts/shared/domain/EventBus";
import { DomainEvent } from "../../../../../../../src/contexts/shared/domain/DomainEvent";

export class EventBusMock implements EventBus {
  private publishSpy = jest.fn();

  async publish(events: DomainEvent[]) {
    this.publishSpy(events);
  }

  addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
    //
  }

  assertLastPublishedEventIs(expectedEvent: DomainEvent) {
    const publishSpyCalls = this.publishSpy.mock.calls;

    expect(publishSpyCalls.length).toBeGreaterThan(0);

    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
    const lastPublishedEvent = lastPublishSpyCall[0][0];

    expect(this.getDataFromDomainEvent(lastPublishedEvent))
    .toMatchObject(this.getDataFromDomainEvent(expectedEvent));
  }

  private getDataFromDomainEvent(event: DomainEvent) {
    const { aggregateId, occurredOn, ...attributes } = event;

    return attributes;
  }
}
