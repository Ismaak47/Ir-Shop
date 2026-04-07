import { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem("recentSearches");
    return saved ? JSON.parse(saved) : [];
  });

  const addRecentSearch = (query: string) => {
    if (!query.trim()) return;
    setRecentSearches(prev => {
      const updated = [query, ...prev.filter(q => q !== query)].slice(0, 10);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <SearchContext.Provider value={{ recentSearches, addRecentSearch, clearRecentSearches }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};
