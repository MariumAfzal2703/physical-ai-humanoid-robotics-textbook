import React, {useState} from 'react';
import type {Props} from '@theme/Root';
import AuthPanel from '../components/AuthPanel';
import ChapterActions from '../components/ChapterActions';
import ChatWidget from '../components/ChatWidget';
import SelectionPopup from '../components/SelectionPopup';

export default function Root({children}: Props): React.JSX.Element {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState<string | undefined>(undefined);
  const [authToken, setAuthToken] = useState<string | null>(null);

  return (
    <>
      {children}
      <AuthPanel onAuthenticated={(token) => setAuthToken(token)} />
      <ChapterActions authToken={authToken} />
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
