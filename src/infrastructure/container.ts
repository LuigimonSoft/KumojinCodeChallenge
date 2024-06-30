import { CustomError, typeErrors } from '../utils/customError';
import { ErrorCode } from '../utils/errorCodes';

export class Container {
  private services: Map<string, any> = new Map();

  register<T>(name: string, instance: T): void {
    this.services.set(name, instance);
  }

  resolve<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new CustomError(ErrorCode.DEPENDENCY_INJECTION_ERROR, typeErrors.INFRASTRUCTURE_ERROR, `Container::resolve:${name}`, null);
    }
    return service as T;
  }
}