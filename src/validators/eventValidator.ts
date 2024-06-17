import { body, validateRequest } from '../middleware/validationMiddleware';
import { ErrorCode } from '../utils/errorCodes';

export const createEventValidator = validateRequest([
  body('name').notNull().withErrorCode(ErrorCode.NAME_REQUIRED)
    .notEmpty().withErrorCode(ErrorCode.NAME_EMPTY).MaxLength(32).withErrorCode(ErrorCode.NAME_MAX_LENGTH),
  body('description').notNull().withErrorCode(ErrorCode.DESCRIPTION_REQUIRED)
    .notEmpty().withErrorCode(ErrorCode.DESCRIPTION_EMPTY),
  body('startDate').notNull().withErrorCode(ErrorCode.STARTDATE_REQUIRED) 
    .notEmpty().withErrorCode(ErrorCode.STARTDATE_EMPTY)
      .isISO8601().withErrorCode(ErrorCode.STARTDATE_INVALID_FORMAT),
  body('endDate').notNull().withErrorCode(ErrorCode.ENDDATE_REQUIRED) 
  .notEmpty().withErrorCode(ErrorCode.ENDDATE_EMPTY)
    .isISO8601().withErrorCode(ErrorCode.ENDDATE_INVALID_FORMAT)
]);

export const getEventByNameValidator = validateRequest([
  body('name').notNull().withErrorCode(ErrorCode.NAME_REQUIRED)
    .notEmpty().withErrorCode(ErrorCode.NAME_EMPTY).MaxLength(32).withErrorCode(ErrorCode.NAME_MAX_LENGTH)
]);