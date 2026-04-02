import React from 'react';
import {describe, expect, it, vi} from 'vitest';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';

import Root from '../../src/theme/Root';

const mockPostChat = vi.fn();

vi.mock('../../src/components/api', () => ({
  postChat: (payload: unknown) => mockPostChat(payload),
}));

describe('selection popup flow', () => {
  it('opens chat and sends context_text when selection is submitted', async () => {
    mockPostChat.mockResolvedValue({
      answer: 'Focused answer',
      sources: ['selected-context'],
      session_id: 'session-1',
    });

    const selectedText = 'Selected robotics passage for focused explanation.';

    const selectionStub = {
      toString: () => selectedText,
      rangeCount: 1,
      getRangeAt: () => ({
        getBoundingClientRect: () => ({top: 120, left: 90}),
      }),
    };

    vi.spyOn(window, 'getSelection').mockReturnValue(selectionStub as unknown as Selection);

    render(
      <Root>
        <main>Lesson content body for selection</main>
      </Root>
    );

    fireEvent.mouseUp(document);
    const askButton = await screen.findByRole('button', {name: 'Ask about this'});
    fireEvent.click(askButton);

    const sendButton = await screen.findByRole('button', {name: 'Send'});
    fireEvent.click(sendButton);

    await waitFor(() => expect(mockPostChat).toHaveBeenCalledTimes(1));
    expect(mockPostChat).toHaveBeenCalledWith(expect.objectContaining({context_text: selectedText}));
  });
});
