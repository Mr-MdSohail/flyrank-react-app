import { useState, useEffect } from 'react'

export function useShowSearch() {
  const [query, setQuery] = useState('')
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cine_favorites')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cine_favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    let ignore = false
    const timer = setTimeout(async () => {
      setLoading(true)
      setError('')
      try {
        const url = query.trim()
          ? 'https://api.tvmaze.com/search/shows?q=' + encodeURIComponent(query.trim())
          : 'https://api.tvmaze.com/shows?page=0'
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to load shows')
        const data = await res.json()
        if (!ignore) {
          const list = query.trim() ? data.map((item) => item.show) : data.slice(0, 24)
          setShows(list)
        }
      } catch (err) {
        if (!ignore) setError(err.message || 'Something went wrong')
      } finally {
        if (!ignore) setLoading(false)
      }
    }, 300)
    return () => { ignore = true; clearTimeout(timer) }
  }, [query])

  const toggleFavorite = (show) => {
    setFavorites((prev) =>
      prev.some((f) => f.id === show.id)
        ? prev.filter((f) => f.id !== show.id)
        : [...prev, show]
    )
  }

  return { query, setQuery, shows, loading, error, favorites, toggleFavorite }
}
