import MovieCard from '../MovieCard/MovieCard';
function MovieList({movieData}) {
  return (
    <section className='movies'>
      <div className='movies__card-list'>
        {movieData.map((movie, i) => (
          <MovieCard key={i} name={movie.name} duration={movie.duration} img={movie.img} isSaved={movie.isSaved} />
        ))}
      </div>
      <button className=' btn movies__more-btn' type='button'>
        Ещё
      </button>
    </section>
  );
}
export default MovieList;
