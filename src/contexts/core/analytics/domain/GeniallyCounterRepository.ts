import { Nullable } from "./../../../shared/domain/Nullable";
import { GeniallyCounter } from "./GeniallyCounter";

export interface GeniallyCounterRepository {
  save(geniallyCounter: GeniallyCounter): Promise<void>;
  find(id: string): Promise<Nullable<GeniallyCounter>>;
}