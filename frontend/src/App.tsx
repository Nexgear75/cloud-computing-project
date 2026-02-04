import { useEffect, useState } from 'react';
import type { NewsResponse, EventsResponse, FaqResponse } from './types';
import NewsTable from './components/NewsTable';
import EventsTable from './components/EventsTable';
import FaqList from './components/FaqList';
import StatusBadge from './components/StatusBadge';

type ViewType = 'news' | 'events' | 'faq';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('news');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData([]);

    fetch(`http://localhost:5000/api/${currentView}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur");
        return res.json();
      })
      .then((json) => {
        if (currentView === 'news') setData((json as NewsResponse).news_feed?.articles || []);
        else if (currentView === 'events') setData((json as EventsResponse).agenda_culturel?.evenements || []);
        else if (currentView === 'faq') setData((json as FaqResponse).base_connaissance?.categories || []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentView]);

  const getTabClass = (view: ViewType) => {
    const base = "px-6 py-2 rounded-full font-medium transition-all duration-200 border border-transparent ";
    return currentView === view
      ? base + "bg-teal-600 text-white shadow-lg shadow-teal-900/50 border-teal-500" // Actif
      : base + "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border-gray-700"; // Inactif
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-teal-500 selection:text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* --- EN-TÊTE GLOBAL (Flex Column Centré) --- */}
        <div className="flex flex-col items-center w-full">

          {/* Titre et Sous-titre */}
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              Dashboard Azure Blob
            </h1>
            <p className="text-gray-400 text-lg">Visualisation des données en temps réel</p>
          </div>

          {/* Zone des Status */}
          <div className="mb-14 flex flex-wrap justify-center gap-4 bg-gray-900/80 p-2 rounded-2xl border border-gray-800 shadow-lg backdrop-blur-md">
            <StatusBadge label="App Flask" endpoint="/health" />
            <StatusBadge label="Azure Storage" endpoint="/ready" />
          </div>

          {/* Navigation (Onglets) */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button className={getTabClass('news')} onClick={() => setCurrentView('news')}>Actualités</button>
            <button className={getTabClass('events')} onClick={() => setCurrentView('events')}>Événements</button>
            <button className={getTabClass('faq')} onClick={() => setCurrentView('faq')}>FAQ</button>
          </div>

        </div>

        {/* --- CONTENU PRINCIPAL --- */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-6 min-h-[400px] relative overflow-hidden">

          {loading && (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-teal-400 animate-pulse">Chargement des données...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-950/50 border border-red-800 text-red-200 p-6 rounded-xl text-center mx-auto max-w-lg mt-10">
              <p className="font-bold text-xl mb-2">Erreur de connexion</p>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && data && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {currentView === 'news' && <NewsTable articles={data} />}
              {currentView === 'events' && <EventsTable events={data} />}
              {currentView === 'faq' && <FaqList categories={data} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
