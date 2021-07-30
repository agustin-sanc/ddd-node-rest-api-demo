export default class EmailAddress {
  constructor(
    private readonly value: string
  ) {
    if(!value)
      throw new Error(
        'Email address value must be defined.'
      );

    if(!this.isValidValueFormat())
      throw new Error(
        'Validation error. Email address must have valid format.'
      );
  }

  private isValidValueFormat(): boolean {
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!this.value) return false;

    if (this.value.length > 254) return false;

    const valid = emailRegex.test(this.value);
    if (!valid) return false;

    const parts = this.value.split('@');
    if (parts[0].length > 64) return false;

    const domainParts = parts[1].split('.');

    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    return true;
  }

  public getValue(): string {
    return this.value;
  }

  public equals(emailAddress: EmailAddress): boolean {
    return this.value === emailAddress.getValue();
  }
}