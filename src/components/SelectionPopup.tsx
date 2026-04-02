import React, {useEffect, useState} from 'react';

type SelectionPopupProps = {
  onAskAboutSelection: (contextText: string) => void;
};

const MIN_SELECTION_LENGTH = 12;
export const MAX_CONTEXT_LENGTH = 1800;

export function truncateSelectionContext(value: string): string {
  return value.slice(0, MAX_CONTEXT_LENGTH);
}

export default function SelectionPopup({onAskAboutSelection}: SelectionPopupProps): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const [contextText, setContextText] = useState('');
  const [position, setPosition] = useState({top: 0, left: 0});

  useEffect(() => {
    function handleSelection() {
      const selection = window.getSelection();
      const selected = selection?.toString().trim() ?? '';

      if (selected.length < MIN_SELECTION_LENGTH || !selection || selection.rangeCount === 0) {
        setVisible(false);
        return;
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setContextText(truncateSelectionContext(selected));
      setPosition({
        top: rect.top + window.scrollY - 44,
        left: rect.left + window.scrollX,
      });
      setVisible(true);
    }

    function hidePopup() {
      setVisible(false);
    }

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    document.addEventListener('scroll', hidePopup, true);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
      document.removeEventListener('scroll', hidePopup, true);
    };
  }, []);

  if (!visible || !contextText) {
    return null;
  }

  return (
    <button
      className="button button--primary button--sm"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        zIndex: 1100,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
      onClick={() => {
        onAskAboutSelection(contextText);
        setVisible(false);
      }}
    >
      Ask about this
    </button>
  );
}
