import type { EventItem } from '../types';

interface Props {
  events: EventItem[];
}

export default function EventsTable({ events }: Props) {
  if (!events || events.length === 0) {
    return <div className="text-center text-gray-500 py-12">Aucun événement prévu.</div>;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleString('fr-FR', {
        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
      });
    } catch { return dateString; }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-gray-300">
        <thead className="bg-gray-800/50 text-blue-400 uppercase text-xs font-bold tracking-wider border-b border-gray-700">
          <tr>
            <th className="px-6 py-4">Événement</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Lieu</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-right">Prix</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {events.map((evt, index) => (
            <tr key={evt.id || index} className="hover:bg-gray-800/60 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-white text-lg">{evt.nom}</div>
                {evt.intervenants && evt.intervenants.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Avec : {evt.intervenants.map(i => i.nom).join(', ')}
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300 border border-blue-800">
                  {evt.type}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="text-gray-200">{evt.lieu?.salle || 'Salle N/A'}</div>
                <div className="text-gray-500 text-xs">{evt.lieu?.adresse}</div>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap">
                <div className="text-gray-300">{evt.horaires?.debut ? formatDate(evt.horaires.debut) : '-'}</div>
              </td>
              <td className="px-6 py-4 text-right">
                {evt.prix === 0 ? (
                  <span className="text-green-400 font-bold text-sm bg-green-900/20 px-2 py-1 rounded">Gratuit</span>
                ) : (
                  <span className="text-white font-mono">{evt.prix} €</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
