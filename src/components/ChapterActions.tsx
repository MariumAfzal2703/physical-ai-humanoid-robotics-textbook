import React, {useMemo, useState} from 'react';
import {postChapterTranslation} from './api';

export default function ChapterActions(): React.JSX.Element | null {
  const [translatedContent, setTranslatedContent] = useState<string>('');
  const [loadingUrdu, setLoadingUrdu] = useState(false);

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

  return (
    <div style={{position: 'fixed', left: 16, bottom: 16, zIndex: 1000, maxWidth: 420}}>
      <button className="button button--secondary" onClick={handleUrduTranslate} disabled={loadingUrdu}>
        {loadingUrdu ? 'Translating...' : 'Read this chapter in Urdu'}
      </button>

      {translatedContent ? (
        <div
          style={{
            marginTop: 8,
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 10,
            padding: 12,
            maxHeight: 280,
            overflowY: 'auto',
          }}
        >
          <strong>Urdu Chapter View</strong>
          <div style={{marginTop: 8, whiteSpace: 'pre-wrap'}}>{translatedContent}</div>
        </div>
      ) : null}
    </div>
  );
}
