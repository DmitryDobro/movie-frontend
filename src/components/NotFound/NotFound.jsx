import {Link} from 'react-router-dom';
function NotFound() {
  return (
    <section className='notFound'>
      <div className='notFound__text'>
        <h1 className='notFound__title'>404</h1>
        <h4 className='notFound__subtitle'>Страница не найдена</h4>
      </div>
      <Link to='/' className='notFound__link'>
        Назад
      </Link>
    </section>
  );
}
export default NotFound;
