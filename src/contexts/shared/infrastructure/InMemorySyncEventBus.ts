import { DomainEventSubscriber } from "./../domain/DomainEventSubscriber";
import { DomainEvent } from "../domain/DomainEvent";
import { EventBus } from "./../domain/EventBus";

type Subscription = {
  boundedCallback: Function;
  originalCallback: Function;  
};

export class InMemorySyncEventBus implements EventBus {
  private subscriptions: Map<string, Array<Subscription>>;

  constructor() {
    this.subscriptions = new Map();
  }

  async publish(events: DomainEvent[]): Promise<void> {
    const executions: any = [];
    events.map(event => {
      const subscribers = this.subscriptions.get(event.eventName);
      if(subscribers) {
        return subscribers.map(subscriber => executions.push(subscriber.boundedCallback(event)));
      }     
    });

    await Promise.all(executions);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    subscribers.map(subscriber => 
      subscriber.subscribedTo().map(event => this.subscribe(event.EVENT_NAME, subscriber))
    );
  }

  private subscribe(eventName: string, subscriber: DomainEventSubscriber<DomainEvent>) {
    const currentSubscriptions = this.subscriptions.get(eventName);
    const subscription = {
      boundedCallback: subscriber.on.bind(subscriber),
      originalCallback: subscriber.on
    };

    if(currentSubscriptions) {
      currentSubscriptions.push(subscription);
    } else {
      this.subscriptions.set(eventName, [subscription]);
    }
  }
}