import { useEffect, useState } from 'react'
import axios from 'axios'

export const useGenres = () => {
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        )
        setGenres(response.data.genres)
      } catch (error) {
        console.error('Error fetching genres:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGenres()
  }, [])

  return { genres, loading }
}