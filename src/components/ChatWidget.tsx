import React, {useState} from 'react';
import {postChat} from './api';

type ChatTurn = {
  role: 'user' | 'assistant';
  text: string;
  sources?: string[];
};

export default function ChatWidget(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [loading, setLoading] = useState(false);

  async function submitQuestion() {
    if (!question.trim()) {
      return;
    }

    const userQuestion = question.trim();
    setQuestion('');
    setTurns((prev) => [...prev, {role: 'user', text: userQuestion}]);

    setLoading(true);
    try {
      const result = await postChat({question: userQuestion, session_id: sessionId});
      setSessionId(result.session_id);
      setTurns((prev) => [
        ...prev,
        {role: 'assistant', text: result.answer, sources: result.sources},
      ]);
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
        <div style={{width: 360, background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 12}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
            <strong>Textbook Assistant</strong>
            <button onClick={() => setOpen(false)}>×</button>
          </div>

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
