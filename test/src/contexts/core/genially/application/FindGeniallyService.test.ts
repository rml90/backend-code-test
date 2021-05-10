import { GeniallyMother } from "./../domain/GeniallyMother";
import { FindGeniallyService } from "../../../../../../src/contexts/core/genially/application/FindGeniallyService";
import { Genially } from "../../../../../../src/contexts/core/genially/domain/Genially";
import { GeniallyNotExist } from "../../../../../../src/contexts/core/genially/domain/GeniallyNotExist";
import { GeniallyRepositoryMock } from "./__mocks__/GeniallyRepositoryMock";


describe("Find an existing genially", () => {
  const repository = new GeniallyRepositoryMock();
  const service = new FindGeniallyService(repository);

  it("should fail if the genially does not exist", async () => {
    repository.returnOnFind(null);

    const result = service.execute("non-existing-id");

    await expect(result).rejects.toBeInstanceOf(GeniallyNotExist);
  });

  it("should return the genially in case it exists", async () => {
    const returnedGenially = GeniallyMother.random();
    repository.returnOnFind(returnedGenially);

    const genially = await service.execute(returnedGenially.id);

    expect(genially).toBeInstanceOf(Genially);
    expect(genially).toStrictEqual(returnedGenially);
  });
});