import { GeniallyCounterRepositoryMock } from "./__mocks__/GeniallyCounterRepositoryMock";
import { GeniallyCounter } from "./../../../../../../src/contexts/core/analytics/domain/GeniallyCounter";
import { IncrementGeniallyCounterService } from "./../../../../../../src/contexts/core/analytics/application/IncrementGeniallyCounterService";

describe("IncrementGeniallyCounterService", () => {
  const repository = new GeniallyCounterRepositoryMock();
  const service = new IncrementGeniallyCounterService(repository);

  it("should initialize and increment the counter if it's the first genially created", async () => {
    repository.returnOnFind(null);
    
    await service.run();

    repository.assertLastSavedGeniallyCounterWas(new GeniallyCounter(1));
  });

  it("should increment the counter if it exists", async () => {
    repository.returnOnFind(new GeniallyCounter(5));

    await service.run();

    repository.assertLastSavedGeniallyCounterWas(new GeniallyCounter(6));
  });
});