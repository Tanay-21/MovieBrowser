import { useGenres } from '@/hooks/useGenres'

export const SearchFilters = ({ filters, setFilters }) => {
  const { genres, loading } = useGenres()
  const currentYear = new Date().getFullYear()
  // In your component
const handleSearch = (e) => {
  setSearchQuery(e.target.value)
  resetPages() // Use the debounced reset function
}

  const handleGenreChange = (genreId) => {
    const newGenres = filters.genres?.includes(genreId)
      ? filters.genres.filter(id => id !== genreId)
      : [...(filters.genres || []), genreId]
    
    setFilters({ ...filters, genres: newGenres })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Year Select */}
      <select
        value={filters.year || ''}
        onChange={e => setFilters({ ...filters, year: e.target.value || null })}
        className="p-2 hovernav border rounded bg-red-400  text-center bg-opacity-70 text-bold  "
        aria-label="Filter by release year"
      >
        <option value="">All Years</option>
        {Array.from({ length: 50 }, (_, i) => currentYear - i).map(year => (
          <option key={year}  value={year}>{year}</option>
        ))}
      </select>

      {/* Rating Select */}
      <select
        value={filters.rating || ''}
        onChange={e => setFilters({ ...filters, rating: e.target.value || null })}
        className="p-2 border rounded  bg-red-400 text-center text-bold hovernav bg-opacity-70 "
        aria-label="Filter by minimum rating"
      >
        <option value="">All Ratings</option>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(rating => (
          <option key={rating} value={rating} >{rating}+</option>
        ))}
      </select>

      {/* Genre Select */}
      <div className="relative group">
        <div className="p-2 border rounded bg-red-400 text-center text-bold hovernav bg-opacity-70 cursor-pointer" aria-haspopup="listbox">
          Genres {filters.genres?.length ? `(${filters.genres.length})` : ''}
        </div>
        <div className="hidden group-hover:block absolute w-full  border rounded bg-green-400 bg-opacity-70  mt-1 p-2 z-10 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="text-gray-500">Loading genres...</div>
          ) : (
            genres.map(genre => (
              <label 
                key={genre.id} 
                className="flex items-center space-x-2 p-1 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={filters.genres?.includes(genre.id) || false}
                  onChange={() => handleGenreChange(genre.id)}
                  className="form-checkbox "
                />
                <span>{genre.name}</span>
              </label>
            ))
          )}
        </div>
      </div>
    </div>
  )
}