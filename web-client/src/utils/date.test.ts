import { describe, it, expect } from 'vitest';
import { formatDate, isOverdue } from './date';

describe('date utilities', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('Jan 15, 2024');
  });

  it('detects overdue dates', () => {
    const pastDate = new Date('2020-01-01');
    expect(isOverdue(pastDate)).toBe(true);

    const futureDate = new Date('2030-01-01');
    expect(isOverdue(futureDate)).toBe(false);
  });
});
