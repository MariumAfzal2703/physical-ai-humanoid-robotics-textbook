import React, {useEffect, useState} from 'react';
import {postOAuthSignin, postSignin, postSignup, type OAuthProvider, postForgotPassword} from './api';

type AuthPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: (token: string, email: string) => void;
  userEmail?: string | null;
  onLogout?: () => void;
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

const linkStyle: React.CSSProperties = {
  textAlign: 'center',
  marginTop: 8,
  fontSize: 13,
  color: '#25c2a0',
  cursor: 'pointer',
  textDecoration: 'underline',
};

export default function AuthPanel({isOpen, onClose, onAuthenticated, userEmail, onLogout}: AuthPanelProps): React.JSX.Element | null {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgotPassword'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [softwareBackground, setSoftwareBackground] = useState('');
  const [hardwareBackground, setHardwareBackground] = useState('');
  const [message, setMessage] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');

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
          software_background: softwareBackground || "Not specified",
          hardware_background: hardwareBackground || "Not specified",
        });
        onAuthenticated(result.token, email);
        setMessage('Signup successful. Personalization is now enabled.');
        return;
      }

      if (mode === 'signin') {
        const result = await postSignin({email, password});
        onAuthenticated(result.token, email);
        setMessage('Signin successful.');
        return;
      }

      if (mode === 'forgotPassword') {
        await postForgotPassword({email: forgotEmail});
        setMessage('If this email exists, a reset link has been sent.');
        return;
      }
    } catch {
      setMessage('Authentication failed.');
    }
  }

  async function oauthSignin(provider: OAuthProvider) {
    try {
      const result = await postOAuthSignin(provider);
      // For OAuth, we need to get the user email somehow - for now, we'll use a placeholder
      onAuthenticated(result.token, `${provider}@oauth.local`);
      setMessage(`${provider[0].toUpperCase()}${provider.slice(1)} signin successful.`);
    } catch {
      setMessage(`${provider} signin failed.`);
    }
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    onClose();
  };

  if (userEmail) {
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
            <strong style={{fontSize: 18}}>Account</strong>
            <button
              onClick={onClose}
              style={{background: 'transparent', border: 'none', color: 'var(--ifm-font-color-base)', fontSize: 20, cursor: 'pointer'}}
              aria-label="Close account dialog"
            >
              ×
            </button>
          </div>

          <div style={{marginBottom: 16}}>
            <p>Welcome, {userEmail}!</p>
          </div>

          <button style={primaryButtonStyle} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
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
          <strong style={{fontSize: 18}}>
            {mode === 'forgotPassword' ? 'Reset Password' : 'Login'}
          </strong>
          <button
            onClick={onClose}
            style={{background: 'transparent', border: 'none', color: 'var(--ifm-font-color-base)', fontSize: 20, cursor: 'pointer'}}
            aria-label="Close login dialog"
          >
            ×
          </button>
        </div>

        {mode !== 'forgotPassword' && (
          <div style={{display: 'flex', gap: 8, marginBottom: 10}}>
            <button style={secondaryButtonStyle} onClick={() => setMode('signin')}>Sign in</button>
            <button style={secondaryButtonStyle} onClick={() => setMode('signup')}>Sign up</button>
          </div>
        )}

        {mode === 'forgotPassword' ? (
          <>
            <input
              value={forgotEmail}
              onChange={(event) => setForgotEmail(event.target.value)}
              placeholder="Enter your email"
              style={inputStyle}
            />
            <button style={primaryButtonStyle} onClick={submit}>
              Send Reset Link
            </button>
            <div style={linkStyle} onClick={() => setMode('signin')}>
              Back to Sign In
            </div>
          </>
        ) : (
          <>
            <div style={{display: 'flex', gap: 8, marginBottom: 10}}>
              <button style={secondaryButtonStyle} onClick={() => oauthSignin('google')}>Continue with Google</button>
              <button style={secondaryButtonStyle} onClick={() => oauthSignin('github')}>Continue with GitHub</button>
            </div>

            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={inputStyle} />
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" style={inputStyle} />

            {mode === 'signup' ? (
              <>
                <textarea value={softwareBackground} onChange={(event) => setSoftwareBackground(event.target.value)} placeholder="Describe your software background (programming languages, frameworks, etc.)" rows={3} style={{...inputStyle, resize: 'vertical'}} />
                <textarea value={hardwareBackground} onChange={(event) => setHardwareBackground(event.target.value)} placeholder="Describe your hardware background (electronics, robotics, etc.)" rows={3} style={{...inputStyle, resize: 'vertical'}} />
              </>
            ) : null}

            <button style={primaryButtonStyle} onClick={submit}>
              {mode === 'signup' ? 'Create account with email' : 'Sign in with email'}
            </button>

            {mode === 'signin' && (
              <div style={linkStyle} onClick={() => setMode('forgotPassword')}>
                Forgot Password?
              </div>
            )}
          </>
        )}

        {message ? <div style={{marginTop: 8, fontSize: 13}}>{message}</div> : null}
      </div>
    </div>
  );
}
