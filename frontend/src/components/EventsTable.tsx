import type { EventItem } from '../types';

interface Props {
  events: EventItem[];
}

export default function EventsTable({ events }: Props) {

  // Sécurité 1 : Si la liste elle-même est vide ou nulle
  if (!events || events.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Aucun événement disponible.</div>;
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
    <table className="beautiful-table">
      <thead>
        <tr>
          <th>Événement</th>
          <th>Type</th>
          <th>Lieu</th>
          <th>Date</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>
        {events.map((evt, index) => (
          // Utilisez index en fallback si l'ID est manquant
          <tr key={evt.id || index}>
            <td>
              {/* Sécurité sur le nom */}
              <strong>{evt.nom || 'Événement sans nom'}</strong>

              {/* Sécurité sur les intervenants (vérifie si le tableau existe ET s'il a des éléments) */}
              {evt.intervenants && evt.intervenants.length > 0 && (
                <div style={{ fontSize: '0.8em', color: '#666', marginTop: '4px' }}>
                  Avec : {evt.intervenants.map(i => i.nom).join(', ')}
                </div>
              )}
            </td>

            <td>
              <span className="badge">{evt.type || 'Divers'}</span>
            </td>

            {/* --- C'EST ICI QUE ÇA PLANTAIT --- */}
            <td>
              {/* On vérifie si evt.lieu existe avec le "?" */}
              {evt.lieu ? (
                <>
                  {evt.lieu.salle || 'Salle inconnue'}<br />
                  <small>{evt.lieu.adresse || ''}</small>
                </>
              ) : (
                <span style={{ fontStyle: 'italic', color: '#999' }}>
                  Lieu à définir
                </span>
              )}
            </td>

            <td>
              {/* Sécurité sur horaires */}
              {evt.horaires?.debut ? formatDate(evt.horaires.debut) : 'Date à venir'}
              {evt.horaires?.fin && (
                <> <br /> à {formatDate(evt.horaires.fin).split(' ')[2] || ''}</>
              )}
            </td>

            <td style={{ fontWeight: 'bold', color: evt.prix === 0 ? 'green' : 'inherit' }}>
              {/* Gestion du prix (le 0 est "falsy" en JS, donc attention aux conditions) */}
              {evt.prix === undefined ? 'N/A' : (evt.prix === 0 ? 'Gratuit' : `${evt.prix} €`)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
