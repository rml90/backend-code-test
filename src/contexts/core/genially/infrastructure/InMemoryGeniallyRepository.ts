import { Nullable } from "./../../../shared/domain/Nullable";
import { Genially } from "../domain/Genially";
import { GeniallyRepository } from "../domain/GeniallyRepository";

export class InMemoryGeniallyRepository implements GeniallyRepository {
  private geniallys: Genially[] = [];

  async save(genially: Genially): Promise<void> {
    await this.delete(genially.id);
    this.geniallys.push(genially);
  }

  async find(id: string): Promise<Nullable<Genially>> {
    return this.geniallys.find((genially) => genially.id === id) || null;
  }

  async delete(id: string): Promise<void> {
    this.geniallys = this.geniallys.filter((genially) => genially.id !== id);
  }
}
