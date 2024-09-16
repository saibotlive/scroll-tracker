import React from 'react';

const DummyArticle: React.FC = () => {
  return (
    <article>
      {/* Dummy content to simulate a long article */}
      <h1>Scroll to track depth!</h1>
      <p>Here is the content of the article. Scroll down...</p>
      {[...Array(100)].map((_, i) => (
        <p key={i}>This is paragraph {i + 1}</p>
      ))}
    </article>
  );
};

export default DummyArticle;
