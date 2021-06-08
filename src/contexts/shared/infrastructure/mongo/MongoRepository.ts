import { MongoClient, Collection } from "mongodb";
import { AggregateRoot } from "../../domain/AggregateRoot";

export abstract class MongoRepository <T extends AggregateRoot>{
  constructor(private _client: Promise<MongoClient>) {}

  protected abstract moduleName(): string;
  
  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();
    const document = aggregateRoot.toPrimitives();
    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  }

  async delete(id: string): Promise<void> {
    await (await this.collection()).deleteOne({ "id": id });
  }

  public async close(): Promise<void> {
    return await (await this.client()).close();
  }

  protected async client(): Promise<MongoClient> {
    return this._client;
  }

  protected async collection(): Promise<Collection> {
    return (await this.client()).db().collection(this.moduleName());
  }
}