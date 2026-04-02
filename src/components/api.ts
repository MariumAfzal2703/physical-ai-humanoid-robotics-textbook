const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export type ChatPayload = {
  question: string;
  context_text?: string;
  session_id?: string;
};

export type ChatResult = {
  answer: string;
  sources: string[];
  session_id?: string;
};

export type ChapterTransformResult = {
  chapter_id: string;
  content: string;
};

export async function postChat(payload: ChatPayload): Promise<ChatResult> {
  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Chat request failed (${response.status})`);
  }

  return (await response.json()) as ChatResult;
}

export async function postChapterTranslation(chapterId: string): Promise<ChapterTransformResult> {
  const response = await fetch(`${BACKEND_URL}/chapters/${encodeURIComponent(chapterId)}/translate-urdu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(`Chapter translation failed (${response.status})`);
  }

  return (await response.json()) as ChapterTransformResult;
}

export async function getHealth(): Promise<{status: string}> {
  const response = await fetch(`${BACKEND_URL}/health`);
  if (!response.ok) {
    throw new Error(`Health check failed (${response.status})`);
  }
  return (await response.json()) as {status: string};
}
