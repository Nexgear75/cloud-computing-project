import type { NewsArticle } from '../types';

interface Props {
  articles: NewsArticle[];
}

export default function NewsTable({ articles }: Props) {
  if (!articles || articles.length === 0) {
    return <div className="text-center text-gray-500 py-12">Aucune actualité disponible.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-gray-300">
        <thead className="bg-gray-800/50 text-teal-400 uppercase text-xs font-bold tracking-wider border-b border-gray-700">
          <tr>
            <th className="px-6 py-4 rounded-tl-lg">Titre</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Auteur</th>
            <th className="px-6 py-4 rounded-tr-lg">Contenu</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {articles.map((item, index) => (
            <tr
              key={item.id || index}
              className="hover:bg-gray-800/60 transition-colors duration-150"
            >
              <td className="px-6 py-4 font-semibold text-white">{item.titre}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.date_publication}</td>
              <td className="px-6 py-4">
                {item.auteur ? (
                  <div className="flex flex-col">
                    <span className="text-gray-200 font-medium">{item.auteur.nom}</span>
                    <span className="text-xs text-teal-500/80">{item.auteur.role}</span>
                  </div>
                ) : <span className="text-gray-600 italic text-sm">Anonyme</span>}
              </td>
              <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate" title={item.contenu_court}>
                {item.contenu_court}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
