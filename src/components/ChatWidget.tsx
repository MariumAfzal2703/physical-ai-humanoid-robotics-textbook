import React, {useState} from 'react';
import {postChat} from './api';

export default function ChatWidget(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function submitQuestion() {
    if (!question.trim()) {
      return;
    }

    setLoading(true);
    try {
      const result = await postChat({question});
      setAnswer(result.answer);
      setSources(result.sources);
    } catch {
      setAnswer('Chat service is currently unavailable.');
      setSources([]);
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
        <div style={{width: 320, background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 12}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
            <strong>Textbook Assistant</strong>
            <button onClick={() => setOpen(false)}>×</button>
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
          {answer ? (
            <div style={{marginTop: 12}}>
              <p style={{marginBottom: 8}}>{answer}</p>
              {sources.length > 0 ? (
                <ul>
                  {sources.map((source) => (
                    <li key={source}>{source}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
