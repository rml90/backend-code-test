import { GeniallyDescription } from "./GeniallyDescription";
import { GeniallyName } from "./GeniallyName";

export class Genially {
  private _id: string;
  private _name: GeniallyName;
  private _description: GeniallyDescription;
  private _createdAt: Date;
  private _modifiedAt: Date;
  private _deletedAt: Date;

  constructor(id: string, name: string, description?: string) {
    this._id = id;
    this._name = new GeniallyName(name);
    this._description = new GeniallyDescription(description);
    this._createdAt = new Date();
  }

  static fromPrimitives(plainData: {id: string; name: string; description?: string; createdAt?: string; modifiedAt?: string; deletedAt?: string}): Genially
  {
    const genially = new Genially(
      plainData.id,
      plainData.name,
      plainData.description
    );

    genially._createdAt = plainData.createdAt ? new Date(plainData.createdAt) : undefined;
    genially._modifiedAt = plainData.modifiedAt ? new Date(plainData.modifiedAt) : undefined;
    genially._deletedAt = plainData.deletedAt ? new Date(plainData.deletedAt) : undefined;

    return genially;
  }

  markAsDeleted() {
    this._deletedAt = new Date();
  }

  rename(newName: string) {
    this._name = new GeniallyName(newName);
    this._modifiedAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): GeniallyName {
    return this._name;
  }

  get description(): GeniallyDescription {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name.value,
      description: this.description.value,
      createdAt: this._createdAt,
      modifiedAt: this._modifiedAt,
      deletedAt: this._deletedAt,
    };
  }  
}
