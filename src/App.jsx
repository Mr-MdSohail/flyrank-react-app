import { useState } from 'react'
import { useShowSearch } from './viewmodels/useShowSearch'
import ShowCard from './components/ShowCard'
import './App.css'

export default function App() {
  const { query, setQuery, shows, loading, error, favorites, toggleFavorite } = useShowSearch()
  const [tab, setTab] = useState('all')
  const displayed = tab === 'favorites' ? favorites : shows

  return (
    <div className="app">
      <header className="header">
        <h1>CineSearch</h1>
        <p>Browse movies & shows or save your favorites</p>
      </header>

      <div className="controls">
        <input
          type="search"
          placeholder="Search shows (e.g., Sherlock, Batman)..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setTab('all') }}
          aria-label="Search shows"
        />
        <div className="tabs">
          <button type="button" className={tab === 'all' ? 'active' : ''} onClick={() => setTab('all')}>
            Explore
          </button>
          <button type="button" className={tab === 'favorites' ? 'active' : ''} onClick={() => setTab('favorites')}>
            Favorites ({favorites.length})
          </button>
        </div>
      </div>

      {error && <p role="alert" className="status error">{error}</p>}
      {loading && tab === 'all' ? (
        <p role="status" className="status">Loading shows...</p>
      ) : displayed.length === 0 ? (
        <p role="status" className="status">
          {tab === 'favorites' ? 'No favorites saved yet.' : 'No shows found.'}
        </p>
      ) : (
        <main className="grid">
          {displayed.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              isFavorite={favorites.some((f) => f.id === show.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </main>
      )}
    </div>
  )
}
