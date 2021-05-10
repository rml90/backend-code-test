import { GeniallyNotExist } from "./../../../../../../src/contexts/core/genially/domain/GeniallyNotExist";
import { RenameGeniallyService } from "../../../../../../src/contexts/core/genially/application/RenameGeniallyService";
import { FindGeniallyService } from "../../../../../../src/contexts/core/genially/application/FindGeniallyService";
import { Genially } from "../../../../../../src/contexts/core/genially/domain/Genially";
import { GeniallyRepositoryMock } from "./__mocks__/GeniallyRepositoryMock";
import { GeniallyNameLengthInvalid } from "../../../../../../src/contexts/core/genially/domain/GeniallyNameLengthInvalid";
import { GeniallyMother } from "../domain/GeniallyMother";

describe("Rename an existing genially", () => {
  const repository = new GeniallyRepositoryMock();
  const findService = new FindGeniallyService(repository);
  const service = new RenameGeniallyService(repository, findService);
  const myGenially = GeniallyMother.random();

  it("should change and update the modification date", async () => {
    repository.returnOnFind(myGenially);

    const returnedGenially = await service.execute({
      "id": myGenially.id,
      "name": "New name",
    });

    const savedGenially = repository.getLastSavedGenially();
    expect(savedGenially).toStrictEqual(returnedGenially);
    expect(savedGenially).toBeInstanceOf(Genially);
    expect(savedGenially.toPrimitives().modifiedAt).toBeInstanceOf(Date);
  });

  it("should fail if the genially does not exist", async () => {
    repository.returnOnFind(null);

    const result = service.execute({
      "id": "8650d137-9cd0-48eb-a40e-a857b387a23a",
      "name": "New name",
    });

    await expect(result).rejects.toBeInstanceOf(GeniallyNotExist);
  });

  it("should fail if the genially is marked as deleted", async () => {
    const deletedGenially = GeniallyMother.deleted();
    repository.returnOnFind(deletedGenially);

    const result = service.execute({
      "id": deletedGenially.id,
      "name": "New name",
    });

    await expect(result).rejects.toBeInstanceOf(GeniallyNotExist);
  });

  it("should fail if the name has an invalid length", async () => {
    repository.returnOnFind(myGenially);

    const result = service.execute({
      "id": myGenially.id,
      "name": "Ne",
    });

    await expect(result).rejects.toBeInstanceOf(GeniallyNameLengthInvalid);
  });
});