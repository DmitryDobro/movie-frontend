function AboutProject(){
    return(
        <section className='aboutProject'>
        <h2 id='aboutProject' className='aboutProject__title'>
          О проекте
        </h2>
        <div className='aboutProject__content'>
          <div className='aboutProject__description'>
            <h4 className='aboutProject__subtitle'>Дипломный проект включал 5 этапов</h4>
            <p className='aboutProject__text'>
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className='aboutProject__description'>
            <h4 className='aboutProject__subtitle'>На выполнение диплома ушло 5 недель</h4>
            <p className='aboutProject__text'>
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className='aboutProject__timetable'>
          <div className='timetable-item'>
            <p className='aboutProject__duration'>1 неделя</p>
            <p className='aboutProject__name'>Back-end</p>
          </div>
          <div className='timetable-item'>
            <p className='aboutProject__duration'>4 недели</p>
            <p className='aboutProject__name'>Front-end</p>
          </div>
        </div>
      </section>
    )
}
export default AboutProject