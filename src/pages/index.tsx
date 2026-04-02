import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home(): React.JSX.Element {
  return (
    <Layout title="Physical AI Textbook">
      <main style={{padding: '2rem', textAlign: 'center'}}>
        <h1>Physical AI Textbook</h1>
        <p>Start the curriculum from the docs homepage.</p>
        <Link className="button button--primary" to="/docs/intro">
          Open Curriculum
        </Link>
      </main>
    </Layout>
  );
}
