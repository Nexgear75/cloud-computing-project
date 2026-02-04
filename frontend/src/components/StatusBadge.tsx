import { useState } from 'react';

interface Props {
  label: string;
  endpoint: string; // ex: "/healthz" ou "/readyz"
}

export default function StatusBadge({ label, endpoint }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [details, setDetails] = useState<string>('');

  const checkStatus = async () => {
    setStatus('loading');
    setDetails('');

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`);
      const json = await res.json();

      if (res.ok) {
        setStatus('success');
        setDetails(json.storage || json.status || 'OK');
      } else {
        setStatus('error');
        setDetails(json.reason || 'Erreur');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setDetails('Offline');
    }
  };

  const getStyles = () => {
    switch (status) {
      case 'loading':
        return 'bg-yellow-900/30 text-yellow-500 border-yellow-700 animate-pulse cursor-wait';
      case 'success':
        return 'bg-green-900/30 text-green-400 border-green-600 hover:bg-green-900/50';
      case 'error':
        return 'bg-red-900/30 text-red-400 border-red-600 hover:bg-red-900/50';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700 hover:text-gray-200';
    }
  };

  return (
    <button
      onClick={checkStatus}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200
        ${getStyles()}
      `}
      title="Cliquer pour vérifier le statut"
    >
      {/* Indicateur visuel (Point) */}
      <span className={`flex h-2.5 w-2.5 rounded-full ${status === 'success' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
        status === 'error' ? 'bg-red-500' :
          status === 'loading' ? 'bg-yellow-500' : 'bg-gray-500'
        }`}></span>

      {/* Texte */}
      <span>{label}</span>

      {/* Détails (affiché seulement si vérifié) */}
      {details && <span className="opacity-75 text-xs border-l border-white/10 pl-2 ml-1">{details}</span>}
    </button>
  );
}
