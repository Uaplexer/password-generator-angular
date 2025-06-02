export class PremiumFeatureError extends Error {
  constructor() {
    super('Premium feature access required.');
    this.name = 'PremiumFeatureError';
  }
}

export class GenericApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GenericApiError';
  }
}
