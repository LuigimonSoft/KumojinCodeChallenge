export enum ErrorCode {
  NAME_REQUIRED = 1001,
  NAME_EMPTY = 1002,
  NAME_MAX_LENGTH = 1003,
  DESCRIPTION_REQUIRED = 1004,
  DESCRIPTION_EMPTY = 1005,
  STARTDATE_REQUIRED = 1006,
  STARTDATE_EMPTY = 1007,
  STARTDATE_INVALID_FORMAT = 1008,
  ENDDATE_REQUIRED = 1009,
  ENDDATE_EMPTY = 1010,
  ENDDATE_INVALID_FORMAT = 1011,
  STARTDATE_GREATER_THAN_ENDDATE = 1012,
  INVALID_JSON_FORMAT = 1013,
  UNEXPECTED_JSON_FORMAT = 1014,
  EVENT_NOT_FOUND = 2001,
  EVENT_ALREADY_EXISTS = 2002,
  DATABASE_ERROR = 4001,
  INTERNAL_SERVER_ERROR = 5001,
  DEPENDENCY_INJECTION_ERROR = 5002
}

export const errorDetails = {
  [ErrorCode.NAME_REQUIRED]: {
    httpStatus: 400,
    message: 'The field Name is required'
  },
  [ErrorCode.NAME_EMPTY]: {
    httpStatus: 400,
    message: 'The field Name cannot be empty'
  },
  [ErrorCode.NAME_MAX_LENGTH]: {
    httpStatus: 400,
    message: 'The field Name must be less than 32 characters'
  },
  [ErrorCode.DESCRIPTION_REQUIRED]: {
    httpStatus: 400,
    message: 'The field Description is required'
  },
  [ErrorCode.DESCRIPTION_EMPTY]: {
    httpStatus: 400,
    message: 'The field Description cannot be empty'
  },
  [ErrorCode.STARTDATE_REQUIRED]: {
    httpStatus: 400,
    message: 'The field StartDate is required'
  },
  [ErrorCode.STARTDATE_EMPTY]: {
    httpStatus: 400,
    message: 'The field StartDate cannot be empty'
  },
  [ErrorCode.STARTDATE_INVALID_FORMAT]: {
    httpStatus: 400,
    message: 'The field StartDate has an invalid datetime ISO 8601 format'
  },
  [ErrorCode.ENDDATE_REQUIRED]: {
    httpStatus: 400,
    message: 'The field EndDate is required'
  },
  [ErrorCode.ENDDATE_EMPTY]: {
    httpStatus: 400,
    message: 'The field EndDate cannot be empty'
  },
  [ErrorCode.ENDDATE_INVALID_FORMAT]: {
    httpStatus: 400,
    message: 'The field EndDate has an invalid datetime ISO 8601 format'
  },
  [ErrorCode.EVENT_NOT_FOUND]: {
    httpStatus: 404,
    message: 'Event not found'
  },
  [ErrorCode.STARTDATE_GREATER_THAN_ENDDATE]: {
    httpStatus: 400,
    message: 'The field StartDate must be less than EndDate'
  },
  [ErrorCode.INVALID_JSON_FORMAT]: {
    httpStatus: 400,
    message: 'Invalid JSON format'
  },
  [ErrorCode.UNEXPECTED_JSON_FORMAT]: {
    httpStatus: 400,
    message: 'Unexpected JSON format'
  },
  [ErrorCode.EVENT_ALREADY_EXISTS]: {
    httpStatus: 409,
    message: 'Event already exists'
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    httpStatus: 500,
    message: 'Internal server error'
  },
  [ErrorCode.DATABASE_ERROR]: {
    httpStatus: 500,
    message: 'Database error'
  },
  [ErrorCode.DEPENDENCY_INJECTION_ERROR]: {
    httpStatus: 500,
    message: 'Dependency injection not found'
  }

}