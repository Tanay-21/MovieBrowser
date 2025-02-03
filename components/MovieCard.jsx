import Image from 'next/image'

import { useFavorites } from '@/hooks/useFavorites'
import { HeartIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline  } from '@heroicons/react/24/outline'


function MyComponent() {
  return (
    <div>
      <BeakerIcon className="size-6 text-blue-500" />
      <p>...</p>
    </div>
  )
}

export const MovieCard = ({ movie }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const year = new Date(movie.release_date).getFullYear() || 'N/A'
  
  return (
    <article className="bg-[url('/mosaic-2790344_1280.png')] rounded-lg shadow-md hover overflow-hidden p-2 " aria-labelledby={`movie-${movie.id}-title`}>
      <div className="relative h-64 ">
        <Image
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-poster.jpg'}
          alt={`Poster for ${movie.title}`}
          fill
          className=" rounded-lg"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4 bg-gray-400  rounded-lg bg-opacity-70 ">
        <h3 id={`movie-${movie.id}-title`} className="font-semibold text-black text-center   text-2xl mb-2">{movie.title}</h3>
        <div className="flex text-yellow-300 justify-between items-center">
          <p className=" font-bold text-lg">Year: {year}</p>
          <p className=" font-bold text-lg">Rating: {movie.vote_average?.toFixed(1)}</p>
        </div>
        <button 
          onClick={() => toggleFavorite(movie)}
          className="mt-2 hover:text-yellow-500 transition-colors"
          aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite(movie.id) ? (
            <HeartIcon className="size-10 text-red-500 ml-36 md:ml-40 " />
          ) : (
            <HeartOutline className="  size-10 text-black ml-36 md:ml-40 hover " />
          )}
        </button>
      </div>
    </article>
  )
}

