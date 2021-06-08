import { MongoClient } from "mongodb";

export class MongoEnvironmentArranger {
  constructor(private _client: Promise<MongoClient>) {}

  public async arrange(): Promise<void> {
    await this.cleanDatabase();
  }

  public async close(): Promise<void> {
    return await (await this.client()).close();
  }  

  protected async cleanDatabase(): Promise<void> {
    const collections = await this.collections();

    for(const collection of collections) {
      await (await this.client()).db().collection(collection).deleteMany({});
    }
  }

  private async collections(): Promise<string[]> {
    const client = await this.client();
    const collections = await client.db()
      .listCollections(undefined, {nameOnly: true})
      .toArray();

      return collections.map(collection => collection.name);
  }

  private async client(): Promise<MongoClient> {
    return this._client;
  }  
}