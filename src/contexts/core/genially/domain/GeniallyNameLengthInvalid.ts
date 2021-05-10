export class GeniallyNameLengthInvalid extends Error {
  constructor(id: string) {
    super(`Genially name <${id}> has an invalid length. it has to be from 3 to 20 characters`);
  }
}