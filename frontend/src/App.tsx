import { useEffect, useState } from 'react';
import './App.css';
import type { NewsResponse, EventsResponse, FaqResponse } from './types';
import NewsTable from './components/NewsTable';
import EventsTable from './components/EventsTable';
import FaqList from './components/FaqList';

// Types d'états possibles
type ViewType = 'news' | 'events' | 'faq';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('news');
  const [data, setData] = useState<any>(null); // On garde 'any' ici car le type change selon la vue
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    // Attention à bien mettre l'URL complète si tu n'as pas configuré de proxy
    fetch(`http://localhost:5000/api/${currentView}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((json) => {
        // Logique d'extraction des données selon le JSON reçu
        if (currentView === 'news') {
          // Type assertion pour aider TypeScript
          setData((json as NewsResponse).news_feed.articles);
        } else if (currentView === 'events') {
          setData((json as EventsResponse).agenda_culturel.evenements);
        } else if (currentView === 'faq') {
          setData((json as FaqResponse).base_connaissance.categories);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  }, [currentView]);

  return (
    <div className="container">
      <h1>Dashboard Azure Blob</h1>

      <div className="tabs">
        <button className={currentView === 'news' ? 'active' : ''} onClick={() => setCurrentView('news')}>News</button>
        <button className={currentView === 'events' ? 'active' : ''} onClick={() => setCurrentView('events')}>Events</button>
        <button className={currentView === 'faq' ? 'active' : ''} onClick={() => setCurrentView('faq')}>FAQ</button>
      </div>

      <div className="content-area">
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}

        {/* Affichage conditionnel des composants */}
        {!loading && !error && data && (
          <>
            {currentView === 'news' && <NewsTable articles={data} />}
            {currentView === 'events' && <EventsTable events={data} />}
            {currentView === 'faq' && <FaqList categories={data} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
