import {v4 as getNewUUID} from 'uuid'

export default class ID {
  constructor(
    private readonly value: string
  ) {
    if(!value) throw new Error('ID value must be defined')
  }

  static create() : ID{
    return new ID(getNewUUID())
  }

  public getValue(): string {
    return this.value
  }

  public equals(id: ID): boolean {
    return this.value === id.getValue()
  }
}