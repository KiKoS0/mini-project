import { HttpError } from 'routing-controllers'
import { ApiCode } from './apiCode'

export default class ApiError extends HttpError {
    public errorCode: ApiCode;
    public args: any[];

    constructor (errorCode: ApiCode, statusCode: number, args: any[] = []) {
      super(statusCode)
      Object.setPrototypeOf(this, ApiError.prototype)
      this.errorCode = errorCode
      this.args = args // can be used for internal logging
    }

    toJSON () {
      return {
        status: this.httpCode,
        failureCode: this.errorCode
      }
    }
}
