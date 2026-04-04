import React, {useState, useEffect} from 'react';

type NavbarTranslateButtonProps = {
  onTranslateClick?: () => void;
};

const navbarButtonStyle: React.CSSProperties = {
  background: '#25c2a0',
  color: '#fff',
  border: 'none',
  borderRadius: 10,
  padding: '6px 12px',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: '14px',
  marginLeft: '8px'
};

export default function NavbarTranslateButton({onTranslateClick}: NavbarTranslateButtonProps): React.JSX.Element {
  return (
    <button
      style={navbarButtonStyle}
      onClick={onTranslateClick}
      title="Read in Urdu"
    >
      Urdu
    </button>
  );
}