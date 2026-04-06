import React, {useEffect, useState} from 'react';
import type {Props} from '@theme/Root';
import AuthPanel from '../components/AuthPanel';
import ChapterActions from '../components/ChapterActions';
import ChatWidget from '../components/ChatWidget';
import SelectionPopup from '../components/SelectionPopup';
import NavbarUpdater from '../components/NavbarUpdater';
import UserAvatar from '../components/UserAvatar';
import GalaxyBackground from '@site/src/components/GalaxyBackground';
import Chatbot from '@site/src/components/Chatbot';

export default function Root({children}: Props): React.JSX.Element {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <>{children}</>;

  const [chatOpen, setChatOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState<string | undefined>(undefined);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token in localStorage on mount
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('authToken');
      const storedEmail = localStorage.getItem('userEmail');

      if (storedToken) {
        setAuthToken(storedToken);
      }
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    }

    function handleLoginTrigger(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('.navbar-login-trigger') as HTMLAnchorElement | null;
      if (!anchor) {
        return;
      }
      event.preventDefault();
      setAuthOpen(true);
    }

    document.addEventListener('click', handleLoginTrigger);
    return () => document.removeEventListener('click', handleLoginTrigger);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const search = new URLSearchParams(window.location.search);
    if (!search.get('auth')) {
      return;
    }

    setAuthOpen(true);
    search.delete('auth');
    const next = `${window.location.pathname}${search.toString() ? `?${search.toString()}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', next);
  }, []);

  const handleAuthenticated = (token: string, email: string) => {
    setAuthToken(token);
    setUserEmail(email);
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
    setAuthOpen(false);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setUserEmail(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
  };

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

  return (
    <>
      <div id="progress-bar" />
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />
      {typeof window !== 'undefined' && <GalaxyBackground />}
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
