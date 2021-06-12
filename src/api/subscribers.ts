import { DomainEventSubscriber } from "./../contexts/shared/domain/DomainEventSubscriber";
import { Definition } from "node-dependency-injection";
import { DomainEvent } from "./../contexts/shared/domain/DomainEvent";
import container from "./config/dependency-injection";

export function registerSubscribers() {
  const eventBus = container.get("Shared.EventBus");
  const subscriberDefinitions = container.findTaggedServiceIds("domainEventSubscriber") as Map<string, Definition>;
  const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

  subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
  eventBus.addSubscribers(subscribers);
}