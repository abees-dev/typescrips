import HttpStatusCodes from 'http-status-codes'
export class CustomError extends Error {
  public readonly statusCode = HttpStatusCodes.BAD_REQUEST

  constructor(msg: string, code: number) {
    super(msg)
    this.statusCode = code
  }
}

export class UserNotFoundError extends CustomError {
  public static readonly Msg = 'User is not on the system'
  public static readonly statusCode = HttpStatusCodes.NOT_FOUND
  constructor() {
    super(UserNotFoundError.Msg, UserNotFoundError.statusCode)
  }
}

export class UserConflictError extends CustomError {
  public static readonly Msg = 'Duplicate email address'
  public static readonly statusCode = HttpStatusCodes.CONFLICT

  constructor() {
    super(UserConflictError.Msg, UserConflictError.statusCode)
  }
}

export class ParamMissingError extends CustomError {
  public static Msg = 'Missing parameter'
  public static readonly statusCode = HttpStatusCodes.BAD_REQUEST

  constructor(msg: string) {
    super(msg, ParamMissingError.statusCode)
  }
}
// UNAUTHORIZED
export class UnauthorizedError extends CustomError {
  public static Msg = 'Unauthorized'
  public static readonly statusCode = HttpStatusCodes.UNAUTHORIZED

  constructor(msg: string) {
    super(msg, UnauthorizedError.statusCode)
  }
}
