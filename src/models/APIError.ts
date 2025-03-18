export class APIError {
  constructor(public reason: string) {}

  static isAPIError(error: unknown): error is APIError {
    if (error instanceof APIError) {
      return true
    }

    if (error && typeof error === 'object' && 'reason' in error && typeof error.reason === 'string') {
      return true
    }

    return false
  }
}
