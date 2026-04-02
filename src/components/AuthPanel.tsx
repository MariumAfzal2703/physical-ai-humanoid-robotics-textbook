import React, {useEffect, useState} from 'react';
import {postOAuthSignin, postSignin, postSignup, type OAuthProvider} from './api';

type AuthPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (token: string) => void;
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: 10,
  padding: '10px 12px',
  borderRadius: 10,
  border: '1px solid var(--ifm-color-emphasis-300)',
  color: 'var(--ifm-font-color-base)',
  background: 'var(--ifm-background-color)',
};

const primaryButtonStyle: React.CSSProperties = {
  width: '100%',
  background: '#25c2a0',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '10px 12px',
  fontWeight: 700,
  cursor: 'pointer',
};

const secondaryButtonStyle: React.CSSProperties = {
  background: '#25c2a0',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '8px 10px',
  fontWeight: 700,
  cursor: 'pointer',
  flex: 1,
};

export default function AuthPanel({isOpen, onClose, onAuthenticated}: AuthPanelProps): React.JSX.Element | null {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [softwareBackground, setSoftwareBackground] = useState('');
  const [hardwareBackground, setHardwareBackground] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  async function submit() {
    try {
      if (mode === 'signup') {
        const result = await postSignup({
          email,
          password,
          software_background: softwareBackground,
          hardware_background: hardwareBackground,
        });
        onAuthenticated(result.token);
        setMessage('Signup successful. Personalization is now enabled.');
        return;
      }

      const result = await postSignin({email, password});
      onAuthenticated(result.token);
      setMessage('Signin successful.');
    } catch {
      setMessage('Authentication failed.');
    }
  }

  async function oauthSignin(provider: OAuthProvider) {
    try {
      const result = await postOAuthSignin(provider);
      onAuthenticated(result.token);
      setMessage(`${provider[0].toUpperCase()}${provider.slice(1)} signin successful.`);
    } catch {
      setMessage(`${provider} signin failed.`);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(0, 0, 0, 0.65)',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'var(--ifm-background-color)',
          color: 'var(--ifm-font-color-base)',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: 14,
          padding: 16,
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
          <strong style={{fontSize: 18}}>Login</strong>
          <button
            onClick={onClose}
            style={{background: 'transparent', border: 'none', color: 'var(--ifm-font-color-base)', fontSize: 20, cursor: 'pointer'}}
            aria-label="Close login dialog"
          >
            ×
          </button>
        </div>

        <div style={{display: 'flex', gap: 8, marginBottom: 10}}>
          <button style={secondaryButtonStyle} onClick={() => setMode('signin')}>Sign in</button>
          <button style={secondaryButtonStyle} onClick={() => setMode('signup')}>Sign up</button>
        </div>

        <div style={{display: 'flex', gap: 8, marginBottom: 10}}>
          <button style={secondaryButtonStyle} onClick={() => oauthSignin('google')}>Continue with Google</button>
          <button style={secondaryButtonStyle} onClick={() => oauthSignin('github')}>Continue with GitHub</button>
        </div>

        <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={inputStyle} />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" style={inputStyle} />

        {mode === 'signup' ? (
          <>
            <textarea value={softwareBackground} onChange={(event) => setSoftwareBackground(event.target.value)} placeholder="Software background" rows={3} style={{...inputStyle, resize: 'vertical'}} />
            <textarea value={hardwareBackground} onChange={(event) => setHardwareBackground(event.target.value)} placeholder="Hardware background" rows={3} style={{...inputStyle, resize: 'vertical'}} />
          </>
        ) : null}

        <button style={primaryButtonStyle} onClick={submit}>
          {mode === 'signup' ? 'Create account with email' : 'Sign in with email'}
        </button>

        {message ? <div style={{marginTop: 8, fontSize: 13}}>{message}</div> : null}
      </div>
    </div>
  );
}
