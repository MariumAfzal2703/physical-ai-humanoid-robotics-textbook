import React, {useState} from 'react';
import {postSignin, postSignup} from './api';

type AuthPanelProps = {
  onAuthenticated: (token: string) => void;
};

export default function AuthPanel({onAuthenticated}: AuthPanelProps): React.JSX.Element {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [softwareBackground, setSoftwareBackground] = useState('');
  const [hardwareBackground, setHardwareBackground] = useState('');
  const [message, setMessage] = useState('');

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

  return (
    <div style={{position: 'fixed', left: 16, top: 16, zIndex: 1000, width: 320, background: '#fff', border: '1px solid #ddd', borderRadius: 12, padding: 12}}>
      <div style={{display: 'flex', gap: 8, marginBottom: 10}}>
        <button className="button button--sm" onClick={() => setMode('signin')}>Sign in</button>
        <button className="button button--sm" onClick={() => setMode('signup')}>Sign up</button>
      </div>

      <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{width: '100%', marginBottom: 8}} />
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" style={{width: '100%', marginBottom: 8}} />

      {mode === 'signup' ? (
        <>
          <textarea value={softwareBackground} onChange={(event) => setSoftwareBackground(event.target.value)} placeholder="Software background" rows={2} style={{width: '100%', marginBottom: 8}} />
          <textarea value={hardwareBackground} onChange={(event) => setHardwareBackground(event.target.value)} placeholder="Hardware background" rows={2} style={{width: '100%', marginBottom: 8}} />
        </>
      ) : null}

      <button className="button button--primary" onClick={submit}>
        {mode === 'signup' ? 'Create account' : 'Sign in'}
      </button>

      {message ? <div style={{marginTop: 8, fontSize: 13}}>{message}</div> : null}
    </div>
  );
}
