import { GeniallyCounter } from "./../domain/GeniallyCounter";
import { GeniallyCounterRepository } from "../domain/GeniallyCounterRepository";

export class IncrementGeniallyCounterService {
  constructor(
    private repository: GeniallyCounterRepository
  ) {}

  async run() {
    let geniallyCounter = await this.repository.find(GeniallyCounter.COUNTER_NAME);
    
    if(geniallyCounter === null) {
      geniallyCounter = GeniallyCounter.initialize();
    }
    
    geniallyCounter.increment();
    
    await this.repository.save(geniallyCounter);
  }
}