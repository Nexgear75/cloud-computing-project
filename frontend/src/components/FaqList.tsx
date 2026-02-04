import type { FaqCategory } from '../types';

interface Props {
  categories: FaqCategory[];
}

export default function FaqList({ categories }: Props) {
  if (!categories || categories.length === 0) return <div className="text-center py-10">Pas de FAQ.</div>;

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Facile': return 'bg-green-900/40 text-green-300 border-green-800';
      case 'Moyen': return 'bg-yellow-900/40 text-yellow-300 border-yellow-800';
      case 'Expert': return 'bg-red-900/40 text-red-300 border-red-800';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  return (
    <div className="space-y-10 p-4">
      {categories.map((cat, idx) => (
        <div key={idx}>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-2 h-8 bg-teal-500 rounded mr-3"></span>
            {cat.nom}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cat.questions?.map((q, qIdx) => (
              <div
                key={qIdx}
                className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 hover:border-teal-500/50 hover:bg-gray-800 transition-all duration-300 shadow-sm"
              >
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="font-semibold text-lg text-gray-100 leading-tight">
                    {q.q}
                  </h3>
                  {q.difficulte && (
                    <span className={`text-xs px-2 py-1 rounded border whitespace-nowrap ${getDifficultyColor(q.difficulte)}`}>
                      {q.difficulte}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {q.r}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
