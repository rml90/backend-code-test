import { Nullable } from "./../../../shared/domain/Nullable";
import { Genially } from "./Genially";

export interface GeniallyRepository {
  save(genially: Genially): Promise<void>;

  find(id: string): Promise<Nullable<Genially>>;

  delete(id: string): Promise<void>;
}
