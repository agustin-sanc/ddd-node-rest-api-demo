export default class Password {
  constructor(
    private readonly value: string
  ) {
    if(!value) throw new Error('Password value must be defined')

    if(value.length < 4)
      throw new Error('Password value must have length greater than four characters')
  }

  public getValue(): string {
    return this.value;
  }

  public equals(password: Password): boolean {
    return this.value === password.getValue();
  }
}