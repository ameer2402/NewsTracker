import { create } from 'zustand';

// Helper to get initial state from localStorage safely
const getLocalStorage = (key, initialValue) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.warn(`Error reading localStorage for key "${key}":`, error);
    return initialValue;
  }
};

const useStore = create((set) => ({
  // Theme State
  theme: getLocalStorage('news-theme', 'dark'),
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('news-theme', JSON.stringify(newTheme));
    return { theme: newTheme };
  }),

  // Preferences State
  country: 'in',
  setCountry: (country) => set({ country }),
  
  searchQuery: '',
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  // Bookmarks State
  bookmarks: getLocalStorage('news-bookmarks', []),
  addBookmark: (article) => set((state) => {
    // Prevent duplicates by checking link or article_id
    const identifier = article.link || article.article_id;
    if (state.bookmarks.some(b => (b.link || b.article_id) === identifier)) return state;
    
    const newBookmarks = [...state.bookmarks, article];
    window.localStorage.setItem('news-bookmarks', JSON.stringify(newBookmarks));
    return { bookmarks: newBookmarks };
  }),
  removeBookmark: (identifier) => set((state) => {
    const newBookmarks = state.bookmarks.filter(b => (b.link || b.article_id) !== identifier);
    window.localStorage.setItem('news-bookmarks', JSON.stringify(newBookmarks));
    return { bookmarks: newBookmarks };
  })
}));

export default useStore;
