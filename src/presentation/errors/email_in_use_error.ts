export class EmailInUseError extends Error {
  constructor() {
    super('Recived email is already in use')
    this.name = 'EmailInUseError'
  }
}
