import React from 'react';
import OriginalDocSidebar from '@theme/DocSidebar';

const DocSidebar = (props) => {
  return (
    <div
      style={{
        background: 'var(--ifm-background-surface-color)',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        padding: '12px',
      }}
    >
      <OriginalDocSidebar {...props} />
    </div>
  );
};

export default DocSidebar;