import { GeniallyMother } from "./../domain/GeniallyMother";
import { MongoEnvironmentArranger } from "./../../../../../../src/contexts/shared/infrastructure/mongo/MongoEnvironmentArranger";
import container from "../../../../../../src/api/config/dependency-injection/index";
import { Genially } from "../../../../../../src/contexts/core/genially/domain/Genially";
import { MongoGeniallyRepository } from "../../../../../../src/contexts/core/genially/infrastructure/MongoGeniallyRepository";

const repository: MongoGeniallyRepository = container.get("Core.Genially.GeniallyRepository");
const arranger: MongoEnvironmentArranger = container.get("Shared.EnvironmentArranger");

const myGenially = GeniallyMother.random();

beforeEach(async () => {
  await arranger.arrange();
});

afterAll(async () => {
  await arranger.close();
});

describe("MongoGeniallyRepository", () => {
  describe("#save", () => {
    it("should save a genially", async () => {
      await repository.save(myGenially);
    });
  });

  describe("#find", () => {
    it("should return an existing genially", async () => {
      await repository.save(myGenially);
      
      const foundGenially = await repository.find(myGenially.id);
      
      expect(foundGenially).toBeInstanceOf(Genially);
      expect(foundGenially).toEqual(myGenially);
    });
    
    it("should no return a non existing genially", async () => {
      const foundGenially = await repository.find(myGenially.id);
      
      expect(foundGenially).toBeNull();
    });
  });  

  describe("#delete", () => {
    it("should delete an existing genially", async () => {
      await repository.save(myGenially);

      await repository.delete(myGenially.id);
      
      const foundGenially = await repository.find(myGenially.id);
      expect(foundGenially).toBeNull();
    });
  });  
});