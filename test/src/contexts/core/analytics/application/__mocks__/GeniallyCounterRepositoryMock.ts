import { GeniallyCounter } from "../../../../../../../src/contexts/core/analytics/domain/GeniallyCounter";
import { GeniallyCounterRepository } from "../../../../../../../src/contexts/core/analytics/domain/GeniallyCounterRepository";

export class GeniallyCounterRepositoryMock implements GeniallyCounterRepository {
  private mockSave = jest.fn();
  private mockFind = jest.fn();
  
  async save(geniallyCounter: GeniallyCounter): Promise<void> {
    this.mockSave(geniallyCounter);
  }

  async find(id: string): Promise<GeniallyCounter> {
    return this.mockFind();
  }

  returnOnFind(geniallyCounter: GeniallyCounter) {
    this.mockFind.mockReturnValue(geniallyCounter);
  }

  assertLastSavedGeniallyCounterWas(geniallyCounter: GeniallyCounter) {
    expect(this.mockSave).toHaveBeenCalledWith(geniallyCounter);
  }
}