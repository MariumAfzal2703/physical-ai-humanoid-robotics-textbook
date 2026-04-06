import React from 'react';
import OriginalCodeBlock from '@theme/CodeBlock';

const CodeBlock = (props) => {
  return (
    <div style={{ position: 'relative' }}>
      <OriginalCodeBlock {...props} />
      <button
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '4px 8px',
          fontSize: '0.8rem',
          color: 'var(--pink)',
        }}
      >
        Copy
      </button>
    </div>
  );
};

export default CodeBlock;