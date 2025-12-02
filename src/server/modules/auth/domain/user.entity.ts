interface UserProps {
  id: string
  name: string
  username: string
  password: string
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private username: string,
    private password: string,
  ) {}

  public static create({ id, name, username, password }: UserProps) {
    return new User(id, name, username, password)
  }

  public getPass() {
    return this.password
  }
}
