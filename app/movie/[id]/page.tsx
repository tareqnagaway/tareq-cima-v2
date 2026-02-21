'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { getMovieDetails, type MovieDetails } from '@/lib/tmdb';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';
import Footer from '@/components/Footer';
import { Clock, Star, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MoviePage() {
  const params = useParams();
  const id = params.id as string;
  const locale = useAppStore((state) => state.locale);
  const { t } = useTranslation(locale);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(parseInt(id), locale === 'ar' ? 'ar-SA' : 'en-US');
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie:', error);
        toast.error(t('error'));
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchMovie();
    }
  }, [id, locale, t]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">{t('error')}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {showPlayer && (
        <VideoPlayer 
          movieId={movie.id}
          title={movie.title}
          onClose={() => setShowPlayer(false)}
        />
      )}
      
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-tareq-gold">
              <Star className="w-5 h-5" />
              <span>{movie.vote_average?.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-5 h-5" />
              <span>{movie.release_date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-5 h-5" />
              <span>{movie.runtime} {t('minutes')}</span>
            </div>
          </div>
          
          <button
            onClick={() => setShowPlayer(true)}
            className="mb-6 px-8 py-3 bg-tareq-gold text-black font-bold rounded-lg hover:bg-tareq-gold/90 transition-all"
          >
            {t('watchNow') || 'Watch Now'}
          </button>
          
          <p className="text-gray-300 text-lg mb-6">{movie.overview}</p>
          
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="px-4 py-2 bg-tareq-gold/20 text-tareq-gold rounded-full">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
