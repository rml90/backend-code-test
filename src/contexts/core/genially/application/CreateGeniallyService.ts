import { EventBus } from "./../../../shared/domain/EventBus";
import { Genially } from "../domain/Genially";
import { GeniallyRepository } from "../domain/GeniallyRepository";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export class CreateGeniallyService {
  constructor(
    private repository: GeniallyRepository,
    private eventBus: EventBus
  ) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    const { id, name, description } = req;
    
    const genially = Genially.create(id, name, description);

    await this.repository.save(genially);

    await this.eventBus.publish(genially.pullDomainEvents());

    return genially;
  }
}
