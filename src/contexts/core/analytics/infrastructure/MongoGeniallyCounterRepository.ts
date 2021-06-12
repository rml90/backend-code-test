import { GeniallyCounterRepository } from "./../domain/GeniallyCounterRepository";
import { MongoRepository } from "../../../shared/infrastructure/mongo/MongoRepository";
import { GeniallyCounter } from "../domain/GeniallyCounter";

export class MongoGeniallyCounterRepository 
  extends MongoRepository<GeniallyCounter> 
  implements GeniallyCounterRepository 
{
  protected moduleName(): string {
    return "genially_counter";
  }

  async save(geniallyCounter: GeniallyCounter): Promise<void> {
    await this.persist(geniallyCounter.id, geniallyCounter);
  }

  async find(): Promise<GeniallyCounter> {
    const collection = await this.collection();
    const document = await collection.findOne({ id: GeniallyCounter.COUNTER_NAME });

    return document ? GeniallyCounter.fromPrimitives({ ...document }) : null;
  }

}