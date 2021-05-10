import { GeniallyNotExist } from "../domain/GeniallyNotExist";
import { GeniallyRepository } from "../domain/GeniallyRepository";
import { FindGeniallyService } from "./FindGeniallyService";

export class DeleteGeniallyService {
  constructor(
    private repository: GeniallyRepository,
    private findGeniallyService: FindGeniallyService
  ) { }

  public async execute(id: string): Promise<void> {
    const genially = await this.findGeniallyService.execute(id);

    if (genially.deletedAt) {
      throw new GeniallyNotExist(id);
    }

    genially.markAsDeleted();
    await this.repository.save(genially);
  }
}
