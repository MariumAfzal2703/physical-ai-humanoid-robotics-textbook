import React, {useEffect, useState} from 'react';
import type {Props} from '@theme/Root';
import AuthPanel from '../components/AuthPanel';
import ChapterActions from '../components/ChapterActions';
import ChatWidget from '../components/ChatWidget';
import SelectionPopup from '../components/SelectionPopup';
import NavbarUpdater from '../components/NavbarUpdater';
import UserAvatar from '../components/UserAvatar';

export default function Root({children}: Props): React.JSX.Element {
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

  return (
    <>
      {children}
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
