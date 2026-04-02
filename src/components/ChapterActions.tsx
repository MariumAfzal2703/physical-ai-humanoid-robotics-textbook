import React, {useEffect, useMemo, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import {postChapterPersonalization, postChapterTranslation} from './api';

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
  const [translatedContent, setTranslatedContent] = useState<string>('');
  const [personalizedContent, setPersonalizedContent] = useState<string>('');
  const [focus, setFocus] = useState('');
  const [loadingUrdu, setLoadingUrdu] = useState(false);
  const [loadingPersonalized, setLoadingPersonalized] = useState(false);
  const {pathname} = useLocation();

  const chapterId = useMemo(() => pathname.replace(/^\/docs\//, '').replace(/^\//, ''), [pathname]);

  useEffect(() => {
    setTranslatedContent('');
    setPersonalizedContent('');
  }, [chapterId]);

  if (!chapterId || chapterId === 'intro') {
    return null;
  }

  async function handleUrduTranslate() {
    setLoadingUrdu(true);
    try {
      const result = await postChapterTranslation(chapterId);
      setTranslatedContent(result.content);
    } catch {
      setTranslatedContent('Urdu translation is currently unavailable. Please try again.');
    } finally {
      setLoadingUrdu(false);
    }
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
    <div style={{position: 'fixed', top: 72, left: '50%', transform: 'translateX(-50%)', zIndex: 1200, width: 'min(94vw, 900px)'}}>
      <div
        style={{
          background: 'var(--ifm-background-color)',
          color: 'var(--ifm-font-color-base)',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: 12,
          padding: 12,
          boxShadow: '0 10px 22px rgba(0, 0, 0, 0.18)',
        }}
      >
        <div style={{display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap'}}>
          <button style={actionButtonStyle} onClick={handleUrduTranslate} disabled={loadingUrdu}>
            {loadingUrdu ? 'Translating...' : 'Read this chapter in Urdu'}
          </button>

          {authToken ? (
            <button style={actionButtonStyle} onClick={handlePersonalize} disabled={loadingPersonalized}>
              {loadingPersonalized ? 'Personalizing...' : 'Personalize this chapter'}
            </button>
          ) : null}
        </div>

        {authToken ? (
          <input
            value={focus}
            onChange={(event) => setFocus(event.target.value)}
            placeholder="Optional focus (e.g., control systems, beginner path)"
            style={{
              width: '100%',
              marginTop: 8,
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid var(--ifm-color-emphasis-300)',
              color: 'var(--ifm-font-color-base)',
              background: 'var(--ifm-background-color)',
            }}
          />
        ) : null}

        {translatedContent ? (
          <div style={cardStyle}>
            <strong>Urdu Chapter View</strong>
            <div style={{marginTop: 8, whiteSpace: 'pre-wrap'}}>{translatedContent}</div>
          </div>
        ) : null}

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
