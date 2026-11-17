export default function ShowCard({ show, isFavorite, onToggleFavorite }) {
  const poster = show.image?.medium || 'https://placehold.co/210x295/1e293b/94a3b8?text=No+Poster'
  const rating = show.rating?.average ? show.rating.average + ' / 10' : 'NR'

  return (
    <article className="show-card">
      <img src={poster} alt={show.name} loading="lazy" />
      <div className="show-info">
        <h3>{show.name}</h3>
        <p className="show-meta">
          {show.genres?.slice(0, 2).join(', ') || 'General'} • ⭐ {rating}
        </p>
        <button
          type="button"
          className={isFavorite ? 'fav-btn active' : 'fav-btn'}
          onClick={() => onToggleFavorite(show)}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '★ Saved' : '☆ Favorite'}
        </button>
      </div>
    </article>
  )
}
