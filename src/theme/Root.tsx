import React, {useState} from 'react';
import type {Props} from '@theme/Root';
import ChapterActions from '../components/ChapterActions';
import ChatWidget from '../components/ChatWidget';
import SelectionPopup from '../components/SelectionPopup';

export default function Root({children}: Props): React.JSX.Element {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState<string | undefined>(undefined);

  return (
    <>
      {children}
      <ChapterActions />
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
