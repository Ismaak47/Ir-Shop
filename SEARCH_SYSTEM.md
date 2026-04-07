# E-Commerce Search System Documentation

## Overview
Complete production-level search system with real-time autocomplete, fuzzy matching, filtering, and sorting.

## Features Implemented

### 1. **Real-Time Search with Autocomplete**
- **Location**: `src/components/SearchBar.tsx`
- Debounced search (300ms delay)
- Live suggestions dropdown with product images
- Shows top 8 matching results
- Click suggestion to navigate to product detail

### 2. **Smart Search Algorithm**
- **Location**: `src/utils/searchUtils.ts`
- **Matching Types**:
  - Exact match (score: 100)
  - Partial name match (score: 80)
  - Tag exact match (score: 70)
  - Tag partial match (score: 60)
  - Description match (score: 40)
  - Fuzzy match with Levenshtein distance
- Results ranked by relevance score

### 3. **Search Results Page**
- **Location**: `src/SearchResultsPage.tsx`
- **Route**: `/search?q=keyword`
- Dynamic filtering by:
  - Price ranges
  - Product tags/categories
- Sorting options:
  - Relevance (default)
  - Price: Low to High
  - Price: High to Low
  - Customer Rating
  - Name: A-Z
- Mobile-responsive filters
- Empty state handling

### 4. **Product Data Structure**
- **Location**: `src/data/products.json`
- Fields:
  ```json
  {
    "id": "unique-id",
    "name": "Product Name",
    "category": "games",
    "description": "Full description",
    "price": "1000000",
    "tags": ["laptop", "gaming", "asus"],
    "image": "url",
    "rating": 4.5,
    "reviews": "100",
    "delivery": "Delivery info",
    "isBestSeller": false,
    "isOverallPick": false
  }
  ```

### 5. **Search Context**
- **Location**: `src/SearchContext.tsx`
- Tracks recent searches (localStorage)
- Max 10 recent searches
- Clear history functionality

### 6. **Performance Optimizations**
- Debounced input (300ms)
- useMemo for expensive computations
- Click outside to close dropdown
- Smooth animations with Framer Motion

## Usage

### Search from Header
1. Type in search bar
2. See autocomplete suggestions
3. Click suggestion OR press Enter
4. Navigate to search results page

### Search Results Page
1. View all matching products
2. Apply filters (price, tags)
3. Sort results
4. Click product to view details

### Adding New Products
Edit `src/data/products.json`:
```json
{
  "id": "new-product-id",
  "name": "New Product",
  "category": "games",
  "description": "Description with keywords",
  "price": "500000",
  "tags": ["keyword1", "keyword2"],
  "image": "https://...",
  "rating": 4.0,
  "reviews": "50",
  "delivery": "TZS 100,000 delivery",
  "isBestSeller": false,
  "isOverallPick": false
}
```

## Search Algorithm Details

### Fuzzy Matching
Uses Levenshtein distance algorithm:
- Allows up to 30% character differences
- Handles typos: "asus" matches "assus"
- Case-insensitive

### Ranking System
1. **Exact name match**: Highest priority
2. **Partial name match**: High priority
3. **Tag matches**: Medium priority
4. **Description matches**: Lower priority
5. **Fuzzy matches**: Lowest priority

## File Structure
```
src/
├── components/
│   └── SearchBar.tsx          # Autocomplete search component
├── data/
│   └── products.json          # Product database
├── utils/
│   └── searchUtils.ts         # Search algorithms
├── SearchContext.tsx          # Recent searches state
├── SearchResultsPage.tsx      # Search results UI
└── App.tsx                    # Routes configuration
```

## Routes
- `/` - Home page
- `/games` - Games catalog
- `/search?q=keyword` - Search results
- `/product/:id` - Product details

## Technologies
- React + TypeScript
- React Router (navigation)
- Framer Motion (animations)
- TailwindCSS (styling)
- LocalStorage (recent searches)

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch-friendly UI
