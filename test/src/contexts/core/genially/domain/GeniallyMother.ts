import { v4 as uuidV4 } from "uuid";
import { Genially } from "../../../../../../src/contexts/core/genially/domain/Genially";

export class GeniallyMother {
  static random(): Genially {
    return new Genially(uuidV4(), "My Genially", "Genially description");
  }

  static deleted(): Genially {
    const genially = GeniallyMother.random();
    genially.markAsDeleted();
    return genially;
  }
}
