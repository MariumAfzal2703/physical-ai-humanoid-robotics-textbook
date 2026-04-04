import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import {postChapterPersonalization} from './api';

type ChapterActionsProps = {
  authToken?: string | null;
};

const actionButtonStyle: React.CSSProperties = {
  background: '#25c2a0',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '10px 12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const cardStyle: React.CSSProperties = {
  marginTop: 8,
  background: 'var(--ifm-background-color)',
  color: 'var(--ifm-font-color-base)',
  border: '1px solid var(--ifm-color-emphasis-300)',
  borderRadius: 10,
  padding: 12,
  maxHeight: 260,
  overflowY: 'auto',
};

export default function ChapterActions({authToken}: ChapterActionsProps): React.JSX.Element | null {
  const [personalizedContent, setPersonalizedContent] = useState<string>('');
  const [focus, setFocus] = useState('');
  const [loadingPersonalized, setLoadingPersonalized] = useState(false);
  const {pathname} = useLocation();

  const chapterId = useMemo(() => pathname.replace(/^\/docs\//, '').replace(/^\//, ''), [pathname]);

  useEffect(() => {
    setPersonalizedContent('');
  }, [chapterId]);

  if (!chapterId || chapterId === 'intro') {
    return null;
  }

  async function handlePersonalize() {
    if (!authToken) {
      return;
    }

    setLoadingPersonalized(true);
    try {
      const result = await postChapterPersonalization(chapterId, authToken, focus || undefined);
      setPersonalizedContent(result.content);
    } catch {
      setPersonalizedContent('Personalization is currently unavailable. Please try again.');
    } finally {
      setLoadingPersonalized(false);
    }
  }

  return (
    <div style={{marginTop: 16, marginBottom: 16}}>
      <div
        style={{
          background: 'var(--ifm-background-color)',
          color: 'var(--ifm-font-color-base)',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: 12,
          padding: 12,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 8}}>
          {authToken ? (
            <>
              <button style={actionButtonStyle} onClick={handlePersonalize} disabled={loadingPersonalized}>
                {loadingPersonalized ? 'Personalizing...' : 'Personalize this chapter'}
              </button>

              <input
                value={focus}
                onChange={(event) => setFocus(event.target.value)}
                placeholder="Optional focus (e.g., control systems, beginner path)"
                style={{
                  width: '100%',
                  marginBottom: 8,
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  color: 'var(--ifm-font-color-base)',
                  background: 'var(--ifm-background-color)',
                }}
              />
            </>
          ) : null}
        </div>

        {personalizedContent ? (
          <div style={cardStyle}>
            <strong>Personalized Chapter View</strong>
            <div style={{marginTop: 8, whiteSpace: 'pre-wrap'}}>{personalizedContent}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
