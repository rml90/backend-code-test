import config from "../../../../api/config/config";

export class MongoConfigFactory {
  static createConfig() {
    return {
      url: config.get("mongo.url")
    };
  }
}