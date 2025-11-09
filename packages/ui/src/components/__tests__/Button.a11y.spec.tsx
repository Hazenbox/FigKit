import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { expect, test } from 'vitest';
import { Button } from '../Button';

expect.extend(toHaveNoViolations);

test('button is axe-clean', async () => {
  const { container } = render(<Button>Save</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

