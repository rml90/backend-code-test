import { GeniallyMother } from "./../domain/GeniallyMother";
import { DeleteGeniallyService } from "../../../../../../src/contexts/core/genially/application/DeleteGeniallyService";
import { FindGeniallyService } from "../../../../../../src/contexts/core/genially/application/FindGeniallyService";
import { Genially } from "../../../../../../src/contexts/core/genially/domain/Genially";
import { GeniallyRepositoryMock } from "./__mocks__/GeniallyRepositoryMock";
import MockDate from "mockdate";
import { GeniallyNotExist } from "../../../../../../src/contexts/core/genially/domain/GeniallyNotExist";

const currentDate = new Date();
beforeAll(() => {
  // it makes sure the date stays fixed to the ms 
  MockDate.set(currentDate);
});

afterAll(() => {
  // remove fixed date 
  MockDate.reset();
});

describe("Delete an existing genially", () => {
  const repository = new GeniallyRepositoryMock();
  const findService = new FindGeniallyService(repository);
  const service = new DeleteGeniallyService(repository, findService);
  const myGenially = GeniallyMother.random();

  it("should mark as deleted the genially", async () => {
    repository.returnOnFind(myGenially);

    await service.execute(myGenially.id);

    expect(repository.getLastSavedGenially()).toBeInstanceOf(Genially);
    expect(repository.getLastSavedGenially().toPrimitives().deletedAt).toBeInstanceOf(Date);
    expect(repository.getLastSavedGenially().toPrimitives().deletedAt).toStrictEqual(currentDate);
  });

  it("should fail if the genially does not exit", async () => {
    repository.returnOnFind(null);

    const result = service.execute("49d4f0b9-1b15-45a4-9e23-55096de0e348");

    await expect(result).rejects.toBeInstanceOf(GeniallyNotExist);
  });

  it("should fail if the genially is already marked as deleted", async () => {
    const deletedGenially = GeniallyMother.deleted();
    repository.returnOnFind(deletedGenially);

    const result = service.execute(deletedGenially.id);

    await expect(result).rejects.toBeInstanceOf(GeniallyNotExist);
  });
});