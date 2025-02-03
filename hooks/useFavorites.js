import { useState, useEffect } from 'react'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('movieFavorites')
    setFavorites(saved ? JSON.parse(saved) : [])
  }, [])

  const isFavorite = (id) => favorites.some(movie => movie.id === id)

  const toggleFavorite = (movie) => {
    const newFavorites = isFavorite(movie.id)
      ? favorites.filter(fav => fav.id !== movie.id)
      : [...favorites, movie]
    
    localStorage.setItem('movieFavorites', JSON.stringify(newFavorites))
    setFavorites(newFavorites)
  }

  return { isFavorite, toggleFavorite }
}