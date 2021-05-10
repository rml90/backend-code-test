import { CreateGeniallyService } from "../../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import { Genially } from "../../../../../../src/contexts/core/genially/domain/Genially";
import { GeniallyNameEmpty } from "../../../../../../src/contexts/core/genially/domain/GeniallyNameEmpty";
import { GeniallyNameLengthInvalid } from "../../../../../../src/contexts/core/genially/domain/GeniallyNameLengthInvalid";
import { GeniallyDescriptionTooLong } from "../../../../../../src/contexts/core/genially/domain/GeniallyDescriptionTooLong";
import { GeniallyRepositoryMock } from "./__mocks__/GeniallyRepositoryMock";
import MockDate from "mockdate";

beforeAll(() => {
  // it makes sure the date stays fixed to the ms 
  MockDate.set(new Date());
});

afterAll(() => {
  // remove fixed date 
  MockDate.reset();
});

describe("Create Genially", () => {
  const request = {
    id: "1",
    name: "My first genially",
    description: "Description of my first genially"
  };
  const repository = new GeniallyRepositoryMock();
  const service = new CreateGeniallyService(repository);

  it("should create a genially", async () => {
    await service.execute(request);

    repository.assertLastSavedGeniallyWas(new Genially(
      request.id,
      request.name,
      request.description
    ));
  });

  it("the name of the genially cannot be empty", async () => {
    request.name = "";
    const result = service.execute(request);
    await expect(result).rejects.toBeInstanceOf(GeniallyNameEmpty);
  });

  describe("cannot have a name with less than 3 characters or more than 20 characters", () => {
    test.each([
      [1], [2], [21], [30]
    ])("%s characters", async (length: number) => {
      request.name = "a".repeat(length);
      const result = service.execute(request);
      await expect(result).rejects.toBeInstanceOf(GeniallyNameLengthInvalid);
    });
  });

  describe("can have a name with a length between 3 and 20 characters", () => {
    test.each([
      [3], [10], [20]
    ])("%s characters", async (length: number) => {
      request.name = "a".repeat(length);
      const result = service.execute(request);
      await expect(result).resolves.toBeInstanceOf(Genially);
    });
  });
  
  describe("can have a description length equal o less than 125 characters", () => {
    test.each([
      [0], [125]
    ])("%s characters", async (length: number) => {
      request.description = "a".repeat(length);
      const result = service.execute(request);
      await expect(result).resolves.toBeInstanceOf(Genially);
    });
  });
  
  describe("cannot have a description length greater than 125 characters", () => {
    test.each([
      [126], [200]
    ])("%s characters", async (length: number) => {
      request.description = "a".repeat(length);
      const result = service.execute(request);
      await expect(result).rejects.toBeInstanceOf(GeniallyDescriptionTooLong);
    });
  });

});