import { MongoEnvironmentArranger } from "../../../../../../src/contexts/shared/infrastructure/mongo/MongoEnvironmentArranger";
import { GeniallyCounter } from "./../../../../../../src/contexts/core/analytics/domain/GeniallyCounter";
import container from "../../../../../../src/api/config/dependency-injection";
import { MongoGeniallyCounterRepository } from "./../../../../../../src/contexts/core/analytics/infrastructure/MongoGeniallyCounterRepository";

const repository: MongoGeniallyCounterRepository = container.get("Core.Analytics.GeniallyCounterRepository");
const arranger: MongoEnvironmentArranger = container.get("Shared.EnvironmentArranger");

beforeEach(async () => {
  await arranger.arrange();
});

afterAll(async () => {
  await arranger.close();
});

describe("MongoGeniallyCounterRepository", () => {
  const geniallyCounter = new GeniallyCounter(10);
  
  describe("#save", () => {
    it("should save a counter", async () => {
      await repository.save(geniallyCounter);
    });
  });

  describe("#find", () => {
    it("should return the existing counter", async () => {
      await repository.save(geniallyCounter);
      
      const foundCounter = await repository.find();

      expect(foundCounter).toBeInstanceOf(GeniallyCounter);
      expect(foundCounter).toEqual(geniallyCounter);
    });

    it("should no return a non existing counter", async () => {
      const foundCounter = await repository.find();
      
      expect(foundCounter).toBeNull();
    });
  });  
});