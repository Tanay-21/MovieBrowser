import useSWRInfinite from 'swr/infinite'
import axios from 'axios'
import { useCallback } from 'react'
import debounce from 'lodash.debounce'

const fetcher = url => axios.get(url).then(res => res.data)

export const useMovies = (searchQuery, filters) => {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.results.length) return null
    
    const params = new URLSearchParams({
      page: pageIndex + 1,
      query: searchQuery,
      include_adult: false,
      ...(filters.year && { primary_release_year: filters.year }),
      ...(filters.rating && { 'vote_average.gte': filters.rating }),
      ...(filters.genres?.length && { with_genres: filters.genres.join(',') })
    })

    const endpoint = searchQuery ? 'search/movie' : 'discover/movie'
    return `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&${params}`
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher)

  // Correct debounce implementation
  const debouncedRefetch = useCallback(
    debounce(() => {
      setSize(1)
    }, 500),
    []
  )

  return {
    movies: data?.flatMap(page => page.results) || [],
    isLoading: !data && !error,
    error,
    size,
    setSize,
    isReachingEnd: data?.[data.length - 1]?.results.length < 20,
    debouncedRefetch
  }
}