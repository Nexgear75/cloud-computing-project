import type { NewsArticle } from '../types';

interface Props {
  articles: NewsArticle[];
}

export default function NewsTable({ articles }: Props) {

  // SÉCURITÉ 1 : Liste vide ou indéfinie
  if (!articles || articles.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Aucune actualité disponible.</div>;
  }

  return (
    <table className="beautiful-table">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Date</th>
          <th>Auteur</th>
          <th>Contenu</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((item, index) => (
          // Utilisation de l'index en fallback pour la clé
          <tr key={item.id || index}>

            <td>{item.titre || 'Sans titre'}</td>

            <td>{item.date_publication || 'Date inconnue'}</td>

            <td>
              {/* SÉCURITÉ CRITIQUE ICI */}
              {/* On vérifie si item.auteur existe AVANT de demander le nom */}
              {item.auteur ? (
                <>
                  <span style={{ fontWeight: 'bold' }}>
                    {item.auteur.nom || 'Anonyme'}
                  </span>
                  <br />
                  {item.auteur.role && (
                    <small style={{ color: '#666' }}>{item.auteur.role}</small>
                  )}
                </>
              ) : (
                <span style={{ fontStyle: 'italic', color: '#999' }}>Auteur inconnu</span>
              )}
            </td>

            <td>{item.contenu_court || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
