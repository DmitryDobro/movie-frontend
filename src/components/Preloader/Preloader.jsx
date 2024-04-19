function Preloader({movie}) {
  return (
    <div className={`preloader ${movie && 'preloader_type_movie'}`}>
      <div className='spinner'></div>
    </div>
  );
}
export default Preloader;
