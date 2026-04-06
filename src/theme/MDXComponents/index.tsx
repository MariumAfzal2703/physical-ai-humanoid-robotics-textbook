import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';

const CustomMDXComponents = {
  ...MDXComponents,
  h1: (props) => (
    <h1
      {...props}
      style={{
        ...props.style,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: 'linear-gradient(135deg, #f72585, #a855f7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      style={{
        ...props.style,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        borderBottom: '1px solid var(--border)',
      }}
    />
  ),
  p: (props) => (
    <p
      {...props}
      style={{
        ...props.style,
        fontFamily: "'Inter', sans-serif",
      }}
    />
  ),
  code: (props) => (
    <code
      {...props}
      style={{
        ...props.style,
        fontFamily: "'Fira Code', monospace",
        color: 'var(--pink)',
        background: 'rgba(247,37,133,0.1)',
        padding: '2px 6px',
        borderRadius: '4px',
      }}
    />
  ),
  a: (props) => (
    <a
      {...props}
      style={{
        ...props.style,
        color: 'var(--purple-light)',
      }}
    />
  ),
};

export default CustomMDXComponents;