import type { FaqCategory } from '../types';

interface Props {
  categories: FaqCategory[];
}

export default function FaqList({ categories }: Props) {

  // SÉCURITÉ 1 : Si la liste globale est vide ou indéfinie
  if (!categories || categories.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Aucune FAQ disponible pour le moment.</div>;
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Facile': return '#e6fffa'; // Vert clair
      case 'Moyen': return '#fffaf0';  // Orange clair
      case 'Expert': return '#fff5f5'; // Rouge clair
      default: return '#f7fafc';       // Gris par défaut
    }
  };

  return (
    <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
      {categories.map((cat, index) => (
        <div key={index} style={{ marginBottom: '2rem' }}>

          {/* Titre de la catégorie */}
          <h2 style={{ borderBottom: '2px solid #009879', paddingBottom: '5px' }}>
            {cat.nom || 'Catégorie sans nom'}
          </h2>

          {/* SÉCURITÉ 2 : Vérifier si 'questions' existe et contient des éléments */}
          {cat.questions && cat.questions.length > 0 ? (
            cat.questions.map((q, qIndex) => (
              <div key={qIndex} style={{
                backgroundColor: 'white',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                // On gère le cas où la difficulté serait manquante
                borderLeft: `5px solid ${q.difficulte === 'Expert' ? '#e53e3e' : '#38b2ac'}`
              }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>
                  {q.q || 'Question manquante'}
                </h3>

                <p style={{ margin: 0, color: '#4a5568' }}>
                  {q.r || 'Réponse à venir...'}
                </p>

                {q.difficulte && (
                  <span style={{
                    fontSize: '0.75rem',
                    backgroundColor: getDifficultyColor(q.difficulte),
                    padding: '2px 8px',
                    borderRadius: '10px',
                    marginTop: '10px',
                    display: 'inline-block'
                  }}>
                    {q.difficulte}
                  </span>
                )}
              </div>
            ))
          ) : (
            // Fallback si la catégorie existe mais n'a pas de questions
            <p style={{ fontStyle: 'italic', color: '#888' }}>
              Aucune question dans cette catégorie.
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
