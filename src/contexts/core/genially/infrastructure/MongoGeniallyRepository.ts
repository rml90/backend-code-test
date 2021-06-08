import { Nullable } from "./../../../shared/domain/Nullable";
import { GeniallyRepository } from "../domain/GeniallyRepository";
import { Genially } from "../domain/Genially";
import { MongoRepository } from "../../../shared/infrastructure/mongo/MongoRepository";

export class MongoGeniallyRepository extends MongoRepository<Genially> implements GeniallyRepository {
  protected moduleName(): string {
    return "genially";
  }
  
  async save(genially: Genially): Promise<void> {
    await this.persist(genially.id, genially);
  }

  async find(id: string): Promise<Nullable<Genially>> {
    const collection = await this.collection();
    const document = await collection.findOne({ id: id });

    return document ? Genially.fromPrimitives({ ...document, id: id }) : null;
  }
}