import { Nullable } from "./../../../../../../../src/contexts/shared/domain/Nullable";
import { Genially } from "../../../../../../../src/contexts/core/genially/domain/Genially";
import { GeniallyRepository } from "../../../../../../../src/contexts/core/genially/domain/GeniallyRepository";

export class GeniallyRepositoryMock implements GeniallyRepository {

  private mockSave = jest.fn();
  private mockFind = jest.fn();

  async save(genially: Genially): Promise<void> {
    this.mockSave(genially);
  }

  public assertLastSavedGeniallyWas(expected: Genially) {
    expect(this.mockSave).toHaveBeenCalledWith(expected);
  }

  public getLastSavedGenially() {
    const lastCallIndex = this.mockSave.mock.calls.length - 1;
    return this.mockSave.mock.calls[lastCallIndex][0];
  }

  async find(id: string): Promise<Genially | null> {
    return this.mockFind(id);
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public returnOnFind(genially: Nullable<Genially>) {
    this.mockFind.mockReturnValue(genially);
  }
}