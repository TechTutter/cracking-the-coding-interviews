class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class EmptyStackError extends BaseError {
  constructor() {
    super('Cannot pop from empty stack');
  }
}

export class EmptyVectorError extends BaseError {
  constructor() {
    super('Cannot pop from empty vector');
  }
}

export class OutOfBoundsError extends BaseError {
  constructor(message: string = 'Index out of bounds') {
    super(message);
  }
}

export class InvalidArgumentError extends BaseError {
  constructor(message: string = 'Invalid argument provided') {
    super(message);
  }
}


