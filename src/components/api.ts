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

export type AuthPayload = {
  email: string;
  password: string;
};

export type OAuthProvider = 'google' | 'github';

export type SignupPayload = AuthPayload & {
  software_background: string;
  hardware_background: string;
};

export type AuthResult = {
  user_id: string;
  token: string;
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

export async function postSignup(payload: SignupPayload): Promise<AuthResult> {
  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Signup failed (${response.status})`);
  }

  return (await response.json()) as AuthResult;
}

export async function postSignin(payload: AuthPayload): Promise<AuthResult> {
  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Signin failed (${response.status})`);
  }

  return (await response.json()) as AuthResult;
}

export async function postOAuthSignin(provider: OAuthProvider): Promise<AuthResult> {
  const response = await fetch(`${BACKEND_URL}/auth/oauth/${encodeURIComponent(provider)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(`${provider} signin failed (${response.status})`);
  }

  return (await response.json()) as AuthResult;
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

export async function postChapterPersonalization(
  chapterId: string,
  token: string,
  focus?: string
): Promise<ChapterTransformResult> {
  const response = await fetch(`${BACKEND_URL}/chapters/${encodeURIComponent(chapterId)}/personalize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({focus}),
  });

  if (!response.ok) {
    throw new Error(`Chapter personalization failed (${response.status})`);
  }

  return (await response.json()) as ChapterTransformResult;
}

export async function postForgotPassword(payload: {email: string}): Promise<{message: string}> {
  const response = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Forgot password request failed (${response.status})`);
  }

  return (await response.json()) as {message: string};
}

export async function getHealth(): Promise<{status: string}> {
  const response = await fetch(`${BACKEND_URL}/health`);
  if (!response.ok) {
    throw new Error(`Health check failed (${response.status})`);
  }
  return (await response.json()) as {status: string};
}
