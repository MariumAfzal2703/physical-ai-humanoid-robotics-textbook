import React, {useEffect, useState} from 'react';
import type {Props} from '@theme/Root';

// All heavy components loaded dynamically - client side only
// This prevents SSR memory spike during build

export default function Root({children}: Props): React.JSX.Element {
  const [mounted, setMounted] = useState(false);
  const [Components, setComponents] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    // Dynamically import all heavy components only on client
    Promise.all([
      import('../components/AuthPanel'),
      import('../components/ChapterActions'),
      import('../components/ChatWidget'),
      import('../components/SelectionPopup'),
      import('../components/NavbarUpdater'),
      import('../components/UserAvatar'),
      import('@site/src/components/GalaxyBackground'),
      import('@site/src/components/Chatbot'),
    ]).then(([
      AuthPanelMod,
      ChapterActionsMod,
      ChatWidgetMod,
      SelectionPopupMod,
      NavbarUpdaterMod,
      UserAvatarMod,
      GalaxyBackgroundMod,
      ChatbotMod,
    ]) => {
      setComponents({
        AuthPanel: AuthPanelMod.default,
        ChapterActions: ChapterActionsMod.default,
        ChatWidget: ChatWidgetMod.default,
        SelectionPopup: SelectionPopupMod.default,
        NavbarUpdater: NavbarUpdaterMod.default,
        UserAvatar: UserAvatarMod.default,
        GalaxyBackground: GalaxyBackgroundMod.default,
        Chatbot: ChatbotMod.default,
      });
    });
  }, []);

  // During SSR and initial render - return only children (no heavy components)
  if (!mounted || !Components) return <>{children}</>;

  return <ClientRoot children={children} Components={Components} />;
}

function ClientRoot({children, Components}: {children: React.ReactNode, Components: any}) {
  const {
    AuthPanel, ChapterActions, ChatWidget,
    SelectionPopup, NavbarUpdater, GalaxyBackground, Chatbot
  } = Components;

  const [chatOpen, setChatOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState<string | undefined>(undefined);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedToken) setAuthToken(storedToken);
    if (storedEmail) setUserEmail(storedEmail);

    function handleLoginTrigger(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('.navbar-login-trigger') as HTMLAnchorElement | null;
      if (!anchor) return;
      event.preventDefault();
      setAuthOpen(true);
    }
    document.addEventListener('click', handleLoginTrigger);
    return () => document.removeEventListener('click', handleLoginTrigger);
  }, []);

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    if (!search.get('auth')) return;
    setAuthOpen(true);
    search.delete('auth');
    const next = `${window.location.pathname}${search.toString() ? `?${search.toString()}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', next);
  }, []);

  useEffect(() => {
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cur) { cur.style.left = mx - 5 + 'px'; cur.style.top = my - 5 + 'px'; }
    };
    document.addEventListener('mousemove', onMove);
    const animRing = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      if (ring) { ring.style.left = rx - 16 + 'px'; ring.style.top = ry - 16 + 'px'; }
      requestAnimationFrame(animRing);
    };
    animRing();
    const onScroll = () => {
      const p = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      const bar = document.getElementById('progress-bar');
      if (bar) bar.style.width = p + '%';
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleAuthenticated = (token: string, email: string) => {
    setAuthToken(token); setUserEmail(email);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
    setAuthOpen(false);
  };

  const handleLogout = () => {
    setAuthToken(null); setUserEmail(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  };

  return (
    <>
      <div id="progress-bar" />
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
      <GalaxyBackground />
      {children}
      <Chatbot />
      <NavbarUpdater authToken={authToken} userEmail={userEmail} onLogout={handleLogout} />
      <ChapterActions authToken={authToken} userEmail={userEmail} onLogout={handleLogout} />
      <AuthPanel
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthenticated={handleAuthenticated}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      <SelectionPopup
        onAskAboutSelection={(contextText) => {
          setSelectedContext(contextText);
          setChatOpen(true);
        }}
      />
      <ChatWidget
        isOpen={chatOpen}
        prefillContextText={selectedContext}
        onContextConsumed={() => setSelectedContext(undefined)}
        onClose={() => setChatOpen(false)}
      />
    </>
  );
}
