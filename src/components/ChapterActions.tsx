import React, {useMemo, useState} from 'react';
import {postChapterPersonalization, postChapterTranslation} from './api';

type ChapterActionsProps = {
  authToken?: string | null;
};

export default function ChapterActions({authToken}: ChapterActionsProps): React.JSX.Element | null {
  const [translatedContent, setTranslatedContent] = useState<string>('');
  const [personalizedContent, setPersonalizedContent] = useState<string>('');
  const [focus, setFocus] = useState('');
  const [loadingUrdu, setLoadingUrdu] = useState(false);
  const [loadingPersonalized, setLoadingPersonalized] = useState(false);

  const chapterId = useMemo(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    const raw = window.location.pathname;
    const normalized = raw.replace(/^\/docs\//, '').replace(/^\//, '');
    return normalized;
  }, []);

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
      setPersonalizedContent('Sign in first to personalize this chapter.');
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
    <div style={{position: 'fixed', left: 16, bottom: 16, zIndex: 1000, maxWidth: 440}}>
      <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
        <button className="button button--secondary" onClick={handleUrduTranslate} disabled={loadingUrdu}>
          {loadingUrdu ? 'Translating...' : 'Read this chapter in Urdu'}
        </button>

        <button className="button button--secondary" onClick={handlePersonalize} disabled={loadingPersonalized}>
          {loadingPersonalized ? 'Personalizing...' : 'Personalize this chapter'}
        </button>
      </div>

      <input
        value={focus}
        onChange={(event) => setFocus(event.target.value)}
        placeholder="Optional focus (e.g., control systems, beginner path)"
        style={{width: '100%', marginTop: 8}}
      />

      {translatedContent ? (
        <div
          style={{
            marginTop: 8,
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 10,
            padding: 12,
            maxHeight: 230,
            overflowY: 'auto',
          }}
        >
          <strong>Urdu Chapter View</strong>
          <div style={{marginTop: 8, whiteSpace: 'pre-wrap'}}>{translatedContent}</div>
        </div>
      ) : null}

      {personalizedContent ? (
        <div
          style={{
            marginTop: 8,
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 10,
            padding: 12,
            maxHeight: 230,
            overflowY: 'auto',
          }}
        >
          <strong>Personalized Chapter View</strong>
          <div style={{marginTop: 8, whiteSpace: 'pre-wrap'}}>{personalizedContent}</div>
        </div>
      ) : null}
    </div>
  );
}
