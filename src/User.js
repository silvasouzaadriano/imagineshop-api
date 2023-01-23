export class User {
  name;
  email;

  constructor(name, email) {
    this.name = name
    this.email = email
  }

  getFullName() {
    return `${this.name} Souza`
  }
}