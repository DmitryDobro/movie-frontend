
import photo from '../../../img/photo.jpeg';
import icon from '../../../img/icon-portfolio.svg';
function AboutStudent(){
    return(
        <section className='aboutStudent'>
        <h2 className='aboutStudent__title' id='student'>
          Студент
        </h2>
        <div className='aboutStudent__info'>
          <div className='aboutStudent__text'>
            <h4 className='aboutStudent__name'>Дмитрий</h4>
            <p className='aboutStudent__job'>Фронтенд-разработчик, 28 лет</p>
            <p className='aboutStudent__description'>
              Я родился и живу в Красноярскею У меня есть жена. Недавно начал кодить. После того, как закончу курс по веб-разработке
              планирую искать работу в этой сфере.
            </p>
            <a href='#' className='aboutStudent__link'>
              Github
            </a>
          </div>
          <img className='aboutStudent__photo' src={photo} alt='Фото' />
          {/* <div className='aboutStudent__photo'>
              <img src={photo} alt='Фото' />
            </div> */}
        </div>
        <div className='aboutStudent__portfolio'>
          <h4 className='aboutStudent__portfolio-subtitle'>Портфолио</h4>
          <div className='aboutStudent__portfolio-site'>
            <a href='#' className='aboutStudent__portfolio-link'>
              Статичный сайт
            </a>
            <a href='#' className='aboutStudent__portfolio-icon'>
              <img src={icon} alt='иконка' />
            </a>
          </div>
          <div className='aboutStudent__portfolio-site'>
            <a href='#' className='aboutStudent__portfolio-link'>
              Адаптивный сайт
            </a>
            <a href='#' className='aboutStudent__portfolio-icon'>
              <img src={icon} alt='иконка' />
            </a>
          </div>
          <div className='aboutStudent__portfolio-site'>
            <a href='#' className='aboutStudent__portfolio-link'>
              Одностраничное приложение
            </a>
            <a href='#' className='aboutStudent__portfolio-icon'>
              <img src={icon} alt='иконка' />
            </a>
          </div>
        </div>
      </section>
    )
}
export default AboutStudent