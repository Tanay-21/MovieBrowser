"use client"

import { useState } from 'react'
import { useMovies } from '@/hooks/useMovies'
import { MovieCard } from '@/components/MovieCard'
import { SearchFilters } from '@/components/SearchFilters'

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    year: null,
    rating: null,
    genres: []
  })

  const { movies, isLoading, error, size, setSize, isReachingEnd, debouncedRefetch } = useMovies(searchQuery, filters)
  useInfiniteScroll(() => !isReachingEnd && !isLoading && setSize(size + 1))

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    debouncedRefetch()
  }

  const uniqueMovies = Array.from(new Set(movies.map(movie => movie.id)))
    .map(id => movies.find(movie => movie.id === id))

  return (
    <div className="min-h-screen bg-[url('/art-6689072_1280.png')]  ">
      <header className="bg-[url('/art-6689072_1280.png')] shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl  mx-auto p-4 ">
          <h1 className="sm:text-5xl  text-3xl drop-shadow-[0px_0px_19px_rgba(225,255,0,0.9)]   text-center font-bold text-green-500 mb-4">Movie Browser</h1>
          
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search movies..."
            className="  md:ml-72 w-full   md:w-1/2 text-center text-lg font-bold placeholder:text-white  p-3 rounded-lg bg-yellow-300 bg-opacity-70 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
            aria-label="Search movies"
          />
          <SearchFilters filters={filters} setFilters={setFilters} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-2')] md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {isLoading && <div className="text-center py-8">Loading more movies...</div>}
        {error && <div className="text-center py-8 text-red-500">Error loading movies</div>}
        {isReachingEnd && movies.length > 0 && (
          <div className="text-center py-8 text-gray-500">No more movies to load</div>
        )}
      </main>
    </div>
  )
}