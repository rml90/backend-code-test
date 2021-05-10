import { Genially } from "../domain/Genially";
import { GeniallyNotExist } from "../domain/GeniallyNotExist";
import { GeniallyRepository } from "../domain/GeniallyRepository";

export class FindGeniallyService {
  constructor(private repository: GeniallyRepository) { }

  public async execute(id: string): Promise<Genially> {
    const genially = await this.repository.find(id);

    if (genially === null) {
      throw new GeniallyNotExist(id);
    }

    return genially;
  }
}
