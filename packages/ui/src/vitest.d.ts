import 'vitest';
import { toHaveNoViolations } from 'jest-axe';

declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T> {}
  interface AsymmetricMatchersContaining extends jest.AsymmetricMatchersContaining {}
}

declare module 'jest-axe' {
  export function toHaveNoViolations(): any;
}

