'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Play, Star, Calendar, Clock, Heart, Share2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import VideoPlayer from '@/components/VideoPlayer';
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from '@/lib/tmdb';
import { useAppStore } from '@/lib/store';
import MovieCard from '@/components/MovieCard';
import PersonCard from '@/components/PersonCard';
import toast from 'react-hot-toast';

interface PageProps {
  params: {
    id: string;
  };
}

export default function MoviePage({ params }: PageProps) {
  const [movie, setMovie] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [similar, setSimilar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  
  const addToWatchlist = useAppStore((state) => state.addToWatchlist);
  const addToFavorites = useAppStore((state) => state.addToFavorites);
  const watchlist = useAppStore((state) => state.watchlist);
  const favorites = useAppStore((state) => state.favorites);
  
  const isInWatchlist = watchlist.some((item) => item.id === parseInt(params.id));
  const isInFavorites = favorites.some((item) => item.id === parseInt(params.id));
  
  useEffect(() => {
    async function loadMovie() {
      try {
        const [movieData, creditsData, similarData] = await Promise.all([
          fetchMovieDetails(parseInt(params.id)),
          fetchMovieCredits(parseInt(params.id)),
          fetchSimilarMovies(parseInt(params.id)),
        ]);
        
        setMovie(movieData);
        setCredits(creditsData);
        setSimilar(similarData.results.slice(0, 12));
      } catch (error) {
        console.error('Error loading movie:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    
    loadMovie();
  }, [params.id]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }
  
  if (!movie) {
    notFound();
  }
  
  const handleAddToWatchlist = () => {
    addToWatchlist({
      id: movie.id,
      type: 'movie',
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    });
    toast.success('Added to watchlist!', {
      icon: '📺',
    });
  };
  
  const handleAddToFavorites = () => {
    addToFavorites({
      id: movie.id,
      type: 'movie',
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
    });
    toast.success('Added to favorites!', {
      icon: '❤️',
    });
  };
  
  const handleShare = async () => {
    try {
      await navigator.share({
        title: movie.title,
        text: `Check out ${movie.title}!`,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  return (
    <>
      {/* Video Player */}
      {showPlayer && (
        <VideoPlayer
          movieId={movie.id}
          title={movie.title}
          onClose={() => setShowPlayer(false)}
        />
      )}
      
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-end">
        {/* Backdrop */}
        <div className="absolute inset-0">
          {movie.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-tareq-dark via-tareq-dark/80 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {movie.title}
            </h1>
            
            {movie.tagline && (
              <p className="text-xl text-white/80 italic mb-6">{movie.tagline}</p>
            )}
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-tareq-gold fill-tareq-gold" />
                <span className="text-white font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-5 h-5" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-5 h-5" />
                <span>{movie.runtime} min</span>
              </div>
              
              {movie.genres && (
                <div className="flex gap-2">
                  {movie.genres.slice(0, 3).map((genre: any) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowPlayer(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Watch Now
              </button>
              
              <button
                onClick={handleAddToWatchlist}
                disabled={isInWatchlist}
                className={`btn-secondary flex items-center gap-2 ${
                  isInWatchlist ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Plus className="w-5 h-5" />
                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              
              <button
                onClick={handleAddToFavorites}
                disabled={isInFavorites}
                className={`btn-secondary flex items-center gap-2 ${
                  isInFavorites ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInFavorites ? 'fill-tareq-gold text-tareq-gold' : ''
                  }`}
                />
                {isInFavorites ? 'Favorited' : 'Add to Favorites'}
              </button>
              
              <button
                onClick={handleShare}
                className="btn-secondary flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Movie Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {movie.overview}
              </p>
            </section>
            
            {/* Cast */}
            {credits?.cast && credits.cast.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {credits.cast.slice(0, 8).map((person: any) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              </section>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poster */}
            {movie.poster_path && (
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            {/* Additional Info */}
            <div className="bg-white/5 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-white/60 text-sm mb-1">Status</h3>
                <p className="text-white">{movie.status}</p>
              </div>
              
              {movie.budget > 0 && (
                <div>
                  <h3 className="text-white/60 text-sm mb-1">Budget</h3>
                  <p className="text-white">
                    ${movie.budget.toLocaleString()}
                  </p>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div>
                  <h3 className="text-white/60 text-sm mb-1">Revenue</h3>
                  <p className="text-white">
                    ${movie.revenue.toLocaleString()}
                  </p>
                </div>
              )}
              
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-white/60 text-sm mb-1">Production</h3>
                  <p className="text-white">
                    {movie.production_companies.map((c: any) => c.name).join(', ')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Similar Movies */}
        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {similar.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
