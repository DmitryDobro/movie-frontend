function Tumb({onChange, checked}) {
  return (
    <section className='tumb'>
      <label className={`switch ${checked ? 'on' : 'off'}`} htmlFor='switch'>
        <input
          type='checkbox'
          name='checkedShortFilm'
          checked={checked || ""}
          onChange={onChange}
          id='switch'
        />
        <span className='slider' />
      </label>
    </section>
  );
}
export default Tumb;
