import { Genially } from "../domain/Genially";
import { GeniallyNotExist } from "../domain/GeniallyNotExist";
import { GeniallyRepository } from "../domain/GeniallyRepository";
import { FindGeniallyService } from "./FindGeniallyService";

type RenameGeniallyServiceRequest = {
  id: string;
  name: string;
};

export class RenameGeniallyService {
  constructor(
    private repository: GeniallyRepository,
    private findGeniallyService: FindGeniallyService
  ) { }

  public async execute({ id, name }: RenameGeniallyServiceRequest): Promise<Genially> {
    const genially = await this.findGeniallyService.execute(id);

    if (genially.deletedAt) {
      throw new GeniallyNotExist(id);
    }

    genially.rename(name);

    await this.repository.save(genially);

    return genially;
  }
}
