export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
  rating: number;
  reviews: string;
  delivery: string;
  isBestSeller?: boolean;
  isOverallPick?: boolean;
}

export interface SearchResult extends Product {
  score: number;
  matchType: 'exact' | 'partial' | 'tag' | 'description';
}

const levenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b.charAt(i - 1) === a.charAt(j - 1)
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
};

const fuzzyMatch = (query: string, target: string): boolean => {
  const distance = levenshteinDistance(query.toLowerCase(), target.toLowerCase());
  return distance <= Math.max(1, Math.floor(query.length * 0.3));
};

export const searchProducts = (products: Product[], query: string): SearchResult[] => {
  if (!query.trim()) return [];
  
  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  products.forEach(product => {
    const name = product.name.toLowerCase();
    const desc = product.description.toLowerCase();
    const tags = product.tags.map(t => t.toLowerCase());
    
    let score = 0;
    let matchType: SearchResult['matchType'] = 'description';

    if (name === q) {
      score = 100;
      matchType = 'exact';
    } else if (name.includes(q)) {
      score = 80;
      matchType = 'partial';
    } else if (tags.some(tag => tag === q)) {
      score = 70;
      matchType = 'tag';
    } else if (tags.some(tag => tag.includes(q))) {
      score = 60;
      matchType = 'tag';
    } else if (desc.includes(q)) {
      score = 40;
      matchType = 'description';
    } else {
      const words = q.split(' ');
      const nameWords = name.split(' ');
      const matchCount = words.filter(w => 
        nameWords.some(nw => nw.includes(w) || fuzzyMatch(w, nw))
      ).length;
      
      if (matchCount > 0) {
        score = (matchCount / words.length) * 50;
        matchType = 'partial';
      }
    }

    if (score > 0) {
      results.push({ ...product, score, matchType });
    }
  });

  return results.sort((a, b) => b.score - a.score);
};

export const highlightMatch = (text: string, query: string): string => {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
};

export const filterByPrice = (products: Product[], min: number, max: number): Product[] => {
  return products.filter(p => {
    const price = parseFloat(p.price);
    return price >= min && price <= max;
  });
};

export const filterByTags = (products: Product[], tags: string[]): Product[] => {
  if (tags.length === 0) return products;
  return products.filter(p => 
    tags.some(tag => p.tags.includes(tag.toLowerCase()))
  );
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    case 'price-high':
      return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
};
