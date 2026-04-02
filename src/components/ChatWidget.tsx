import React, {useEffect, useState} from 'react';
import {postChat} from './api';

type ChatTurn = {
  role: 'user' | 'assistant';
  text: string;
  sources?: string[];
};

type ChatWidgetProps = {
  isOpen?: boolean;
  prefillContextText?: string;
  onClose?: () => void;
  onContextConsumed?: () => void;
};

export default function ChatWidget({
  isOpen,
  prefillContextText,
  onClose,
  onContextConsumed,
}: ChatWidgetProps = {}): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [loading, setLoading] = useState(false);
  const [contextText, setContextText] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof isOpen === 'boolean') {
      setOpen(isOpen);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!prefillContextText) {
      return;
    }

    setOpen(true);
    setContextText(prefillContextText);
    setQuestion('Can you explain this selected passage in simple steps?');
    onContextConsumed?.();
  }, [prefillContextText, onContextConsumed]);

  async function submitQuestion() {
    if (!question.trim()) {
      return;
    }

    const userQuestion = question.trim();
    setQuestion('');
    setTurns((prev) => [...prev, {role: 'user', text: userQuestion}]);

    setLoading(true);
    try {
      const result = await postChat({
        question: userQuestion,
        session_id: sessionId,
        context_text: contextText,
      });
      setSessionId(result.session_id);
      setTurns((prev) => [
        ...prev,
        {role: 'assistant', text: result.answer, sources: result.sources},
      ]);
      setContextText(undefined);
    } catch {
      setTurns((prev) => [
        ...prev,
        {role: 'assistant', text: 'Chat service is currently unavailable.', sources: []},
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{position: 'fixed', right: 16, bottom: 16, zIndex: 1000}}>
      {!open ? (
        <button className="button button--primary" onClick={() => setOpen(true)}>
          Ask AI
        </button>
      ) : (
        <div style={{width: 380, background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 12}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
            <strong>Textbook Assistant</strong>
            <button
              onClick={() => {
                setOpen(false);
                onClose?.();
              }}
            >
              ×
            </button>
          </div>

          {contextText ? (
            <div
              style={{
                background: '#eef6ff',
                border: '1px solid #b8d7ff',
                borderRadius: 8,
                padding: 8,
                marginBottom: 8,
                fontSize: 12,
              }}
            >
              <strong>Selected context:</strong>
              <div style={{marginTop: 4, maxHeight: 72, overflowY: 'auto'}}>{contextText}</div>
            </div>
          ) : null}

          <div style={{maxHeight: 220, overflowY: 'auto', marginBottom: 8}}>
            {turns.map((turn, index) => (
              <div key={`${turn.role}-${index}`} style={{marginBottom: 10}}>
                <div style={{fontWeight: 600}}>{turn.role === 'user' ? 'You' : 'Assistant'}</div>
                <div>{turn.text}</div>
                {turn.role === 'assistant' && turn.sources && turn.sources.length > 0 ? (
                  <ul style={{marginTop: 4}}>
                    {turn.sources.map((source) => (
                      <li key={source}>{source}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask about this lesson..."
            rows={4}
            style={{width: '100%', marginBottom: 8}}
          />
          <button className="button button--secondary" onClick={submitQuestion} disabled={loading}>
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </div>
      )}
    </div>
  );
}
