import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

describe('frontend test setup', () => {
  it('renders a basic element', () => {
    render(<div>vitest works</div>);
    expect(screen.getByText('vitest works')).toBeInTheDocument();
  });
});
