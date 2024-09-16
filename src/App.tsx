import { useEffect } from 'react';
import useScrollDepthTracker from './hooks/useScrollDepthTracker';
import DummyArticle from './components/DummyArticle';

function App() {
  useScrollDepthTracker();

  useEffect(() => {
    const handleScrollDepthReached = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      alert(`You reached ${customEvent.detail}% of the article!`);
    };

    window.addEventListener('scrollDepthReached', handleScrollDepthReached as EventListener);

    return () => {
      window.removeEventListener('scrollDepthReached', handleScrollDepthReached as EventListener);
    };
  }, []);

  return <div className="App">{import.meta.env.MODE === 'development' && <DummyArticle />}</div>;
}

export default App;
