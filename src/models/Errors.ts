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

export class VertexNotFoundError extends BaseError {
  constructor(vertex: string | number) {
    super(`Vertex ${vertex} not found in graph`);
  }
}

export class EdgeNotFoundError extends BaseError {
  constructor(from: string | number, to: string | number) {
    super(`Edge from ${from} to ${to} not found in graph`);
  }
}

export class DuplicateVertexError extends BaseError {
  constructor(vertex: string | number) {
    super(`Vertex ${vertex} already exists in graph`);
  }
}

export class DuplicateEdgeError extends BaseError {
  constructor(from: string | number, to: string | number) {
    super(`Edge from ${from} to ${to} already exists in graph`);
  }
}

export class BufferFullError extends BaseError {
  constructor() {
    super('Circular buffer is full');
  }
}

export class BufferEmptyError extends BaseError {
  constructor() {
    super('Circular buffer is empty');
  }
}


