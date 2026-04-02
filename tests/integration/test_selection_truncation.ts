import {describe, expect, it} from 'vitest';
import {MAX_CONTEXT_LENGTH, truncateSelectionContext} from '../../src/components/SelectionPopup';

describe('selection truncation guard', () => {
  it('truncates long selected text to maximum length', () => {
    const longText = 'a'.repeat(MAX_CONTEXT_LENGTH + 75);
    const truncated = truncateSelectionContext(longText);

    expect(truncated).toHaveLength(MAX_CONTEXT_LENGTH);
  });
});
