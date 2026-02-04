// src/types.ts

// --- NEWS ---
export interface NewsArticle {
  id: string;
  titre: string;
  date_publication: string;
  contenu_court: string;
  auteur: { nom: string; role: string };
}

export interface NewsResponse {
  news_feed: { articles: NewsArticle[] };
}

// --- EVENTS ---
export interface Intervenant {
  nom: string;
  expertise: string;
}

export interface EventItem {
  id: string;
  nom: string;
  type: string;
  prix: number;
  notes?: string; // Optionnel
  description?: string; // Optionnel
  horaires: { debut: string; fin: string };
  lieu: { adresse: string; salle: string };
  intervenants?: Intervenant[]; // Optionnel
}

export interface EventsResponse {
  agenda_culturel: { evenements: EventItem[] };
}

// --- FAQ ---
export interface FaqQuestion {
  q: string;
  r: string;
  difficulte: 'Facile' | 'Moyen' | 'Expert';
}

export interface FaqCategory {
  nom: string;
  questions: FaqQuestion[];
}

export interface FaqResponse {
  base_connaissance: { categories: FaqCategory[] };
}
